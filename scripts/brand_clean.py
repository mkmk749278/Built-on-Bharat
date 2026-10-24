#!/usr/bin/env python3
"""Remove the image generator's sparkle mark from the bottom-right corner of a brand image (PLAYBOOK §6.5).

The mark is a flat light-grey four-point star on a dark textured background. We find it by colour (bright,
unsaturated) inside the bottom-right corner, then copy real texture from a shifted patch over it with a feathered
edge, so the grain (and any blueprint line the shift lines up) carries on through the repaired area instead of a
smooth blur. `--inpaint` is the fallback when no patch fits.

Usage: scripts/brand_clean.py IN.png OUT.png [--dx 0] [--dy -360] [--grow 15] [--poisson | --inpaint]
Brand files (2026-10-24): logo with --poisson (defaults otherwise); banner with --dx -97 --dy 0 --grow 21 (lines up the frame's
vertical line at x 2640 with the one at x 2543).
"""
import argparse

import cv2
import numpy as np


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--corner", type=int, default=420, help="size of the bottom-right square searched for the mark")
    ap.add_argument("--dy", type=int, default=-360, help="vertical offset of the clean texture patch")
    ap.add_argument("--dx", type=int, default=0, help="horizontal offset of the clean texture patch")
    ap.add_argument("--grow", type=int, default=15, help="mask dilation in px (covers the anti-aliased edge)")
    ap.add_argument("--poisson", action="store_true",
                    help="Poisson-blend the patch (matches a vignette's brightness; use where no line must line up)")
    ap.add_argument("--inpaint", action="store_true",
                    help="no clean patch nearby (lines cross the mark): inpaint, then re-grain from the surroundings")
    a = ap.parse_args()

    img = cv2.imread(a.src, cv2.IMREAD_COLOR)
    h, w = img.shape[:2]
    c = a.corner
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    mask = np.zeros((h, w), np.uint8)
    roi = hsv[h - c:, w - c:]
    mark = ((roi[..., 2] > 110) & (roi[..., 1] < 40)).astype(np.uint8) * 255
    n, lab, stats, _ = cv2.connectedComponentsWithStats(mark)
    if n < 2:
        raise SystemExit("no mark found")
    big = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))  # the star is the largest bright, grey blob
    mask[h - c:, w - c:] = (lab == big).astype(np.uint8) * 255
    mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (a.grow, a.grow)))
    x, y, bw, bh = cv2.boundingRect(mask)
    pad = 24
    x0, y0, x1, y1 = max(x - pad, 0), max(y - pad, 0), min(x + bw + pad, w), min(y + bh + pad, h)

    if a.inpaint:
        out = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)
        # Inpainting is smooth; give the hole the same fine grain as the ring of texture around it.
        ring = cv2.dilate(mask, np.ones((41, 41), np.uint8)) & ~mask
        hp = img.astype(np.float32) - cv2.GaussianBlur(img, (0, 0), 2).astype(np.float32)
        sd = float(hp[ring > 0].std())
        rng = np.random.default_rng(7)
        grain = cv2.GaussianBlur(rng.normal(0, sd, img.shape[:2]).astype(np.float32), (0, 0), 0.7)
        soft = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 3)[..., None]
        out = np.clip(out.astype(np.float32) + grain[..., None] * soft, 0, 255).astype(np.uint8)
        cv2.imwrite(a.dst, out, [cv2.IMWRITE_PNG_COMPRESSION, 6])
        print(f"mark area {int(stats[big, cv2.CC_STAT_AREA])} px, box {x0},{y0}-{x1},{y1}, inpainted (grain sd {sd:.1f})")
        return

    if a.poisson:
        patch = img[y0 + a.dy:y1 + a.dy, x0 + a.dx:x1 + a.dx].copy()
        pm = cv2.dilate(mask[y0:y1, x0:x1], np.ones((9, 9), np.uint8))
        out = cv2.seamlessClone(patch, img, pm, ((x0 + x1) // 2, (y0 + y1) // 2), cv2.NORMAL_CLONE)
        cv2.imwrite(a.dst, out, [cv2.IMWRITE_PNG_COMPRESSION, 6])
        print(f"mark area {int(stats[big, cv2.CC_STAT_AREA])} px, Poisson patch from offset {a.dx},{a.dy}")
        return

    # Copy real texture from the shifted patch with a feathered edge. Pixels whose source is itself under the mark
    # (the patch overlaps the star) fall back to inpainting.
    M = np.float32([[1, 0, -a.dx], [0, 1, -a.dy]])
    src = cv2.warpAffine(img, M, (w, h), borderMode=cv2.BORDER_REFLECT)
    src_bad = cv2.warpAffine(mask, M, (w, h)) > 0
    fill = np.where(src_bad[..., None], cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA), src)
    soft = cv2.GaussianBlur(mask.astype(np.float32) / 255, (0, 0), 2.5)[..., None]
    out = (img.astype(np.float32) * (1 - soft) + fill.astype(np.float32) * soft).clip(0, 255).astype(np.uint8)
    cv2.imwrite(a.dst, out, [cv2.IMWRITE_PNG_COMPRESSION, 6])
    print(f"mark area {int(stats[big, cv2.CC_STAT_AREA])} px, box {x0},{y0}-{x1},{y1}, texture from offset "
          f"{a.dx},{a.dy}; {int((src_bad & (mask > 0)).sum())} px inpainted")

if __name__ == "__main__":
    main()
