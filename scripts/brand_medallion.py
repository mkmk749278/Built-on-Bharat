#!/usr/bin/env python3
"""Cut the logo medallion out onto a transparent background (PLAYBOOK §6.5).

The medallion's outline (face and side wall) is measured from the image itself: from a centre estimate, each of
1,440 rays finds the outermost strong bright-to-dark edge; the rays are median-smoothed and an ellipse is fitted
(2026-10-24 fit on the cleaned logo: centre 1026.5,1016.1, axes 1644.8 x 1653.7, angle 43.7, within ~2 px of the
real edge all round). Alpha is that ellipse, anti-aliased at 4x and pulled in by `--inset` px so no background
fringe survives.

Usage: scripts/brand_medallion.py LOGO_CLEAN.png OUT_DIR [--inset 3]
Writes medallion_2048.png (cropped to the disc, transparent) and medallion_512.png, medallion_256.png.
"""
import argparse
from pathlib import Path

import cv2
import numpy as np
from numpy.lib.stride_tricks import sliding_window_view


def outline(img: np.ndarray) -> tuple:
    g = cv2.GaussianBlur(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(np.float32), (0, 0), 2.5)
    h, w = g.shape
    # Coarse centre and face radius: least-squares circle through the strongest edge on each ray.
    cx, cy = w / 2, h / 2
    angs = np.deg2rad(np.arange(0, 360, 0.5))
    rs = np.arange(0.34 * w, 0.45 * w)
    pts = []
    for a in angs:
        xs, ys = cx + rs * np.cos(a), cy + rs * np.sin(a)
        prof = cv2.remap(g, xs.astype(np.float32)[None], ys.astype(np.float32)[None], cv2.INTER_LINEAR)[0]
        i = int(np.argmin(np.diff(prof)))
        pts.append((xs[i], ys[i]))
    P = np.array(pts)
    keep = np.ones(len(P), bool)
    for _ in range(5):
        x, y = P[keep, 0], P[keep, 1]
        c = np.linalg.lstsq(np.c_[2 * x, 2 * y, np.ones(len(x))], x * x + y * y, rcond=None)[0]
        X, Y, R = c[0], c[1], np.sqrt(c[2] + c[0] ** 2 + c[1] ** 2)
        res = np.hypot(P[:, 0] - X, P[:, 1] - Y) - R
        keep = np.abs(res) < max(3 * np.median(np.abs(res[keep])), 4)
    # Outermost strong edge on each ray (the side wall sits outside the face), smoothed, then an ellipse.
    angs = np.deg2rad(np.arange(0, 360, 0.25))
    rs = np.arange(R - 20, R + 110, 0.5)
    rad = []
    for a in angs:
        xs, ys = X + rs * np.cos(a), Y + rs * np.sin(a)
        prof = cv2.remap(g, xs.astype(np.float32)[None], ys.astype(np.float32)[None], cv2.INTER_LINEAR)[0]
        d = np.diff(prof)
        idx = np.where(d < 0.35 * d.min())[0]
        rad.append(rs[idx[-1]] if len(idx) else np.nan)
    rad = np.array(rad)
    k = 61
    pad = np.r_[rad[-(k // 2):], rad, rad[:k // 2]]
    med = np.nanmedian(sliding_window_view(pad, k), axis=1)[:len(rad)]
    return cv2.fitEllipse(np.c_[X + med * np.cos(angs), Y + med * np.sin(angs)].astype(np.float32))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--inset", type=float, default=3)
    a = ap.parse_args()
    img = cv2.imread(a.src, cv2.IMREAD_COLOR)
    (ex, ey), (ea, eb), ang = outline(img)
    print(f"ellipse centre {ex:.1f},{ey:.1f} axes {ea:.1f} x {eb:.1f} angle {ang:.1f}")
    h, w = img.shape[:2]
    S = 4
    big = np.zeros((h * S, w * S), np.uint8)
    cv2.ellipse(big, ((ex * S, ey * S), ((ea - 2 * a.inset) * S, (eb - 2 * a.inset) * S), ang), 255, -1,
                lineType=cv2.LINE_AA)
    alpha = cv2.resize(big, (w, h), interpolation=cv2.INTER_AREA)
    rgba = np.dstack([img, alpha])
    x, y, bw, bh = cv2.boundingRect((alpha > 0).astype(np.uint8))
    side = max(bw, bh) + 8
    sq = np.zeros((side, side, 4), np.uint8)
    ox, oy = (side - bw) // 2, (side - bh) // 2
    sq[oy:oy + bh, ox:ox + bw] = rgba[y:y + bh, x:x + bw]
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(str(out / "medallion_2048.png"), cv2.resize(sq, (2048, 2048), interpolation=cv2.INTER_LANCZOS4))
    for s in (512, 256):
        cv2.imwrite(str(out / f"medallion_{s}.png"), cv2.resize(sq, (s, s), interpolation=cv2.INTER_AREA))
    print(f"disc {bw}x{bh} px -> {out}")


if __name__ == "__main__":
    main()
