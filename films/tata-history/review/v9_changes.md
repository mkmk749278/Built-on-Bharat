# v9: the forensic audit of v8, and every word checked against its picture (2026-10-31)

Input: the owner's forensic audit of `tata-history_v8_720p.mp4`, and the owner's direction: "every verb, name or thing
the narration describes should show the exact scene there; no repeated scene in between; smooth transitions; no
glitches or frozen scenes." Narration, voice, timing and facts stay locked. v9 changes picture only.

Method: every frame of v8 measured for black flashes. Then two frames a second with the words heard under each
(`scripts/word_sheets.py`, 58 sheets), and every sheet read. 81 notes, each fixed or answered below.

## Glitches and smoothness
| v8 | v9 |
|---|---|
| 28 one-frame black flashes (measured; the review's other 11 are the same events or dark cuts) | Root cause fixed in `DepthPhoto` (the hold released before the 3D canvas drew). Every render shard is now measured and re-rendered if a flash appears; the film fails loud rather than ship one |
| Fade-ins dipped to black (0:17 bangle, 2:33, 7:11, 11:25 and others) | Fade-ins are true dissolves over the previous shot; a test render holds brightness flat through the cut |
| Dims to near-black mid-sentence (2:33, 3:14, 15:28) | Dims stop at 30–40 % |
| Stuttering archive: Jamshedpur film, Land Rover plant, Singur crowd | Motion-interpolated to 60 fps (only the seconds used) |
| Furnace animation stepping | The hot-air dashes moved 14 px a frame on an 80 px pattern (aliasing); now 3 px |
| Air India clip opened on the advert's London cut-away | The aircraft only, slowed smoothly (interpolated to 372 fps) |
| AI171: 9 s of plain black after the text left | The card, larger (96/46/50 px), stays with a breathing light to the end of the passage |

## Word to scene (each line: when, what is said, what v9 shows)
- 0:08 "More than twice the size": the Jubilee print is on the table from the first frame (no empty table).
- 0:41 "The company is Tata Steel": the early works, not Dorabji's portrait again.
- 0:44 "Look around you today": a Mumbai road tonight (the chai clip now plays once, on "tea").
- 0:53 "Not at the top of any rich list": no grey name bars; a pencilled "Tata?" searches the register and is struck out.
- 0:59 "The answer is in this bank": the bank counter, dissolving to the table on "that diamond".
- 1:19 Navsari: the Parsi prayer photo is captioned honestly (Bombay, 1903, the faith he was born into).
- 1:54 "The safe path… the risky one": priests at prayer, then the harbour (trade).
- 2:14 schoolchildren labelled TODAY; 2:18 Elphinstone captioned as its later building (1905); 2:27 Shanghai captioned
  from its source record (the Bund's western warehouses, about 1850).
- 2:43 the chart is "COTTON PRICES · 1865", not a bill of exchange.
- 2:49 "His father's firm cannot go on… face every debt": cotton bales at the Bombay terminus, "EVERY DEBT" on the word
  (the blank ledger is gone).
- 3:38 "A priest's son": the other Jamsetji portrait (the oval one is kept for 1868 and 1919).
- 3:44 the 1890s harbour photochrom captioned "a later view, the 1890s"; at 9:22 the 1903 harbour photo instead.
- 4:05 the opium trade: two clippers, not one 10 s hold.
- 4:36 "pays them when hurt": the mill dispensary on those words; 4:39 "your own first job": a mill worker today.
- 5:22 "three bigger ones": three prints dealt onto the table (steel, monsoon power, the institute).
- 5:39 the institute: a second view lands after the thirty lakh counter.
- 5:50 "The hardest of the three is steel": the works it became; the search map follows, brighter, its pins saying
  "tried, wrong" (no unnamed "trial site" twice).
- 6:44 the waterfall slowed so the hikers never enter.
- 6:51 "They go back, looking for one perfect spot": one descent from all of India onto the real confluence.
- 7:55 "bet that Indians can make steel": Indian workers building railway coaches, about 1895.
- 9:42 "The diamond on the counter": the stone in its open case on the counter, never floating on black.
- 10:33 "They have no children": Sir Dorabji Tata's mausoleum at Brookwood (Commons, CC0), not the 1927 photo a 4th time.
- 10:37 the will page carries "LEFT TO THE TRUST" while the voice says it; 10:51 "the trust sells the jewels": the
  jewellery line is marked and struck (v8 highlighted the shares).
- 11:41 1925, the apprentice: a different Bombay street (Cruickshank Road), not the share-office film again.
- 11:48 "India's first pilot licence": the Puss Moth type, not a stock sunset.
- 12:06 "He lands in Bombay… at Juhu": the route now reaches Bombay on the word (v8 stopped at Ahmedabad).
- 13:06 "A student in Bangalore": the institute's main building (the statue garden is kept for 1909).
- 13:19 "she writes a postcard": pen loops written onto the card as she writes, no invented words.
- 13:28 the telegram: RECONSTRUCTION, PUNE complete.
- 13:42 the 1970s photograph is captioned with its decade; "February 1978" stays in the voice.
- 14:01 "INDIA · 1991, photographed that year" (the photo's own record).
- 14:08 1991 handover: J.R.D. as he was then, not at 51.
- 14:29 "two years… tending the blast furnace": the Jamshedpur furnaces on film (the cutaway drawing is kept for 1911).
- 15:51 the year counter lands on 2007 before the line ends.
- 16:32 "March.": the March page is down on the word.
- 16:33 "Ford is selling two famous British brands. Jaguar and Land Rover": the two cars dealt onto the table, each lit
  on its name, then the Land Rover plant (Ford's headquarters had been on screen twice).
- 17:33 "MORE THAN SIXTY GUESTS · SILENT IN THE DARK" at 64 px.
- 19:47 "Back to the bank in 1924": the bank counter, not the street a fifth time.
- 20:00 the org chart's company names about 40 % larger.
- 20:29 "research": the institute's campus (the statue a fourth time is gone).
- 20:43 "thousands came": the crowd and the guard of honour, ANI's footage of 10 October 2024 (banner cropped off).
- 20:49 "He was given a state funeral": the flag-draped coffin carried (v8 put a photo of him alive beside "funeral").
- 20:54 and 1:12: the words sit above the façade, clear of the BOMBAY HOUSE sign.
- 21:47 "Rs. 91,000 CRORE": one currency style for the whole film.
- 22:37 "That part is yours": a family on one scooter today (the 1906 street a third time is gone).
- Every lower-third lifted to about 81 % of the height, clear of YouTube's bar and captions, with a 30 px sub line.

## Answered without a picture change
- "Doubled words" at 4:33, 6:22, 19:04: the voice track is silent right after each word. They are transcript errors,
  not the voice. Nothing to trim.
- The outro's Amul card sits left on purpose: the right half is kept for YouTube's end-screen elements.
- The 1:19 Parsi photo and the 15:46 Upcott card stay: one is captioned honestly, the other is the deliberate callback.
- The finale roll call (22:09–22:33) repeats faces on purpose: it is the callback the film is built for.
