# v7 720p review (2026-10-28)

Cut: `tata-history_v7_720p.mp4` (Drive `tata-history/renders/`), 1280×720, 60 fps, 23:03.2. Farm run 40683031043
(one shard re-run after a network timeout fetching Chrome; no code fault).

## Measured
- Loudness: −14.2 LUFS integrated, LRA 3.5 LU, true peak −1.3 dBFS. On target.
- freezedetect (2.5 s) and blackdetect (0.4 s) over the whole cut; every hit opened and judged below.
- Contact sheets: one frame every 3 s (461 frames), all read; full-size probes at every suspect point.

## Found and fixed
| Time | Problem | Fix |
|---|---|---|
| 2:48–2:57 | cotton-crash ledger: the seeded nonsense letters read sharp once the table shrinks the page, so it looked fake | blur raised to the rich list's 5.5–7 px |
| 5:51–6:07 | "every place he tries": the satellite ground sat still for 16 s (three freezes) while only the pins moved | slow aerial drift across the plateau under the searching pins |
| 9:14–9:16 | "It isn't.": 2.3 s of a lone ember on black (void) | the lamp goes down on Jamsetji's photograph on the table, never to black |
| 13:21–13:27 | late J.R.D. portrait: stair-stepped edge round the face from depth displacement | depth off, push-in only (PLAYBOOK §10.5) |
| 17:33–17:37 | "silent in the dark": the staircase dimmed to 8%, read as black | dimmed to 20%: dark, but the staircase reads |
| 19:25–19:28 | AI171: 3 s of flat black before the candle | the candle rises out of the dark through the same pause; same words, same timing |
| 21:36–21:39 | "A TATA FACTORY": the source clip's teal end-card band rose into frame | clip moved to a clean stretch (1:00, the body line) |
| 21:39–21:42 | Dholera from orbit: the plate rendered as brown blur, then popped in | root cause: SVG `<image>` is not waited on by Remotion; `PlateImage` holds each frame until its plate loads (all maps) |

## Checked and kept
- Furnace cutaway (8:12, 14:30), the night window and its 90 minutes (15:18, 16:42), the TCS dividend bar (19:06),
  `OwnershipFlow` (19:57, 21:27): plan_v7's "machine room", blueprint on charcoal by design.
- The candle for the 2008 dead (17:54) and for AI171: real candle footage, a dignity choice, no crash imagery.
- 15:27 (1.1 s) and 19:30/19:38 (under 1 s): fades inside the shot, not holds.
- The Upcott quote three times (8:00, 8:42, 15:45): a deliberate callback, the second and third land the payoff.

## Next
Re-render at 720p on the farm, re-run the same checks on the new cut, then send it to the owner. 4K only after approval.
