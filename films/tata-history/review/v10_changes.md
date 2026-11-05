# v10: the film moves to Be Practical with Kishore; the v9 audit's fixes (2026-11-05)

Owner, 2026-11-05: "we don't maintain Built on Bharat channel, so we are uploading it to Be Practical With Kishore";
Built on Bharat continues there as a playlist ("same video list continues").

## Channel change
- Corner bug: the Be Practical with Kishore logo square (Creator `assets/brand/logo_square.png`), top-right, 78 px,
  hidden through the outro. The Built on Bharat medallion is gone from the film.
- Outro: Creator's logo sting (ported frame for frame into `remotion/src/bpk.tsx`) under a new Akash line, then the
  Amul tease on the desk with the BPK logo; the film now runs ~4 s past the last word for YouTube's end screen.
  New voice (Akash, Eleven v4, stability 0.50, similarity 0.80, the film's settings), take in Drive
  `tata-history/vo/b17_bpk.mp3`; loudness matched to the old outro (+0.9 dB):
  "This is Be Practical with Kishore. Next in our Built on Bharat series. How did a group of farmers in a small
  Gujarat town build Amul? Stay practical. Jai Hind."
- Timing, captions, SFX cues for the new sting re-done; mix rebuilt (−14.1 LUFS, −1.1 dBTP). v9 files kept in Drive
  as `vo_full_v9.wav`, `mix_v9.wav`.
- Present-day sum in ₹ (₹91,000 crore, Dholera). Historic sums stay "Rs." (the ₹ sign dates from 2010).

## v9 audit fixes (measured on `tata-history_v9_720p.mp4`: 0 black flashes, −14.2 LUFS)
| v9 | v10 |
|---|---|
| 13:35 and 21:38: three 1-frame shots inside the Sanand clip (a source cut at 62.3 s) | windows between the source's own cuts: 51.3 s (workers on the line) and 75.85 s (paint shop) |
| 14:48.8, 14:50.6: 2–6 frame shots in the Indica advert | the sky-and-falling-car shot alone (1.45 s, at 0.56 speed), ending before the advert's next cut |
| 16:10.5: 2–3 frame shots in the Nano launch clip | 115.0 s: the car driving out into the lights, one shot |
| 16:39 "TATA" over WELCOME TO LAND ROVER (read "LCOME TO TATA D ROVER") | the word sits over the plant, right of the sign |
| 17:05 date, 17:43 Kang name, 19:28 AI171 card: grey on grey | full ink, dark scrim, sub-lines ≥ 34 px |
| 17:55 "AT LEAST 31…" 40 px | 52 px on a scrim |
| 19:05 dividend bar labels 30–32 px | 38–40 px |
| 18:23 Corus split labels 24 px | 36 px |
| 19:55–21:34 ownership chart ended zoomed in, HOSPITALS cut off the left edge; labels 24–27 px | ends at ~0.99 scale, all inside the frame; labels 27–33 px |
| 20:27 "TATA MAIN HOSPITAL" over the medical college's sign | clip starts on the hospital (1.68 s) |
| 20:55 "2026" across the BOMBAY HOUSE sign | in the sky band |
| 21:03 board note header wrapped, a stamp over the card | header on two lines at 40 px, body 40 px, stamp removed |
