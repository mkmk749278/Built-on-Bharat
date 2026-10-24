# Brand motion and files

**Files.** Full-size originals live in Drive `Built-on-Bharat/_Channel/`: the generator originals
(`logo_emblem_2000.png`, `banner_2000x1116.png`), the cleaned versions (`logo_emblem_clean_2048.png`,
`banner_clean_2752x1536.png`, sparkle mark removed), the transparent medallion (`medallion_2048/512/256.png`) and the
outro sting (`bob_sting_4k60.mp4`, `bob_sting_1080p60.mp4`). Git holds small reference copies in `assets/brand/`.

**Rebuild** (2026-10-24):
```bash
.venv/bin/python scripts/brand_clean.py logo_emblem_2000.png logo_clean.png --poisson
.venv/bin/python scripts/brand_clean.py banner_2000x1116.png banner_clean.png --dx -97 --dy 0 --grow 21
.venv/bin/python scripts/brand_medallion.py logo_clean.png out/            # medallion_2048/512/256.png
cp out/medallion_2048.png brand/remotion/public/img/                         # 11 MB, gitignored
python3 scripts/brand_ts.py brand/remotion/src/brand.ts
cd brand/remotion && npm ci && npx tsc --noEmit
npx remotion render src/index.ts Sting out/bob_sting_4k60.mp4 --scale=2 --codec=h264 --crf=14 --concurrency=4
```

**The sting ("Forged", 6 s, 60 fps, `brand/remotion/src/Sting.tsx`).** The medallion is pulled out of darkness by forge
light, lands on a strike with a burst of sparks off its lower rim, a glint crosses the metal, then BUILT ON BHARAT and
the tagline. Measured: 4K (`--scale=2`) at about 3.5 frames a second on the 4-vCPU session VM, 360 frames in ~2 min.
**Sound:** not baked in. The SFX cues are exported as `stingCues` (riser, metal strike at frame 72, spark burst, glint
shimmer, whoosh) and are mixed with licensed effects in each film's mix (Freesound previews are blocked from the cloud).
