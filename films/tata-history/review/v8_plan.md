# v8 plan: both outside reviews of v7b, checked and merged (2026-10-29)

Inputs:
- **Review A**, the "directorial audit" (verdict in `outside_review_v7b.md`).
- **Review B**, the "visual audit": 6/10, nine red flags.
- **The analysis of B** the owner shared.

Every timestamp in B was checked against frames from `tata-history_v7b_720p.mp4`, plus the manifest and the code.
Narration, VO, timing and facts stay locked. v8 is picture and sound only.

## 1. Where the analysis of B goes wrong
- **"Delete Flight 171, it is an LLM hallucination."** False. Air India flight 171 crashed at Ahmedabad on 12 June 2025,
  and 260 people were killed (claims T72, T73). Review A's knowledge stops before that date; the analysis copied its
  error and overruled Review B, which had it right. The beat stays, and the narration is unchanged. B's real point
  stands: it shouldn't reuse the 26/11 candle (see 3.6).
- **"Mute the Hindi audio bleed at 20:35."** There is none to mute. Footage is muted in code, and the only sound at
  20:35 is the narration and an instrumental track (Kevin MacLeod, "Lost Frontier"). B itself never claimed this.
  Everything else in the analysis matches B, and we take it.

## 2. Review B's red flags: all confirmed in the frames
| # | Flag | Checked | v8 fix |
|---|---|---|---|
| 1 | ₹ on period sums | ₹21,000 (1868), ₹30,00,000 (the institute offer), ₹2,00,00,000 (1924), and the 1907 counter | "Rs." in the period serif for every pre-2010 sum. ₹ only for Dholera |
| 2 | Gateway under "December 1903" | The c.1930 Commons photo (B009b) carries the 1903 caption; the Gateway was finished in 1924 | "December 1903" goes on the 1908 postcard ("on a 1908 postcard"); B009b only with "c. 1930" or not at all |
| 3 | Fake text | The "India's Richest" list: invented names, values out of order. The 2:50 ledger: pseudo-script | No invented letterforms anywhere. Real scans, or ruled lines with no glyphs. Blur is not a fix |
| 4 | Modern footage graded as archive | The hard-hat clip (Jamshedpur centenary film, 2007) at 1:15 and under "1924" at 9:34, plus 14:35 and 22:25; the hair-netted mill worker at 4:40 | Modern footage only for modern beats, in colour, labelled "today". 1924 and the 1870s get period photographs |
| 5 | Bombay House with AC units under 1925 | Confirmed; the façade appears 9 times | A period image for 1925. The modern façade twice at most |
| 6 | Map pins move, modern city before Jamshedpur | Coal, iron and water jump between frames. 6:55 shows today's Jamshedpur for Sakchi | Pins locked to real coordinates. Period survey sheets under the lamp; the satellite only as a then-and-now beat |
| 7 | Captions collide | A white sans tag and a gold serif caption on the same shot (Cornell 14:20; Bombay House 21:00 and 21:10) | One caption per shot |
| 8 | Caption mismatches | NCPA "archival photograph" over an SUV and a crane; a cleanroom tagged "London" | "The NCPA, photographed 2024"; "a chip cleanroom". "The R.B.I. said no" goes over the RBI building. The Bose portrait is PD on Commons, author unknown: its provenance gets one more check |
| 9 | Two type systems plus a monospace | Confirmed | One serif family for every caption and one numeral style. The boxed sans and the monospace are retired |
| + | Black notched block, top left of the desk | Confirmed (an out-of-focus prop rendering solid) | Fixed in the table plate |

B's tone and era notes are also confirmed:
- 15:55: a smiling Ratan Tata into 26/11.
- 13:50: the young J.R.D. over 1978.
- 19:15: "2022" over a 1950s Constellation.
- A Boeing 777 demonstrator tail just before AI171 (that was a 787): it goes.
- 14:00: "1991" on a sepia bullock cart.

## 3. The v8 list (both reviews, no duplicates)
**3.1 Trust (do first):** everything in section 2.

**3.2 The opening.**
- Open on Meherbai's portrait wearing the Jubilee and push in on the stone, then cut to the closed box on the counter.
- The weight is stamped once and held still (245.35 carats). No ticking counter, and the stone never floats on black.
- The Koh-i-Noor comparison becomes real photographs at true scale against her portrait or a hand.
- The bangle clip comes down from about 9 s to 3 s.
- The box and desk get wear: a scuffed leather box, brass patina, dust in the key light.

**3.3 Period texture.**
- Each era gets its own look (B's ladder):
  - 1860–1900: engravings and albumen prints
  - 1900–1940: silver gelatin and nitrate grain
  - 1950s–70s: faded colour slide and 16 mm
  - 1990s: video colour
  - 2008 on: clean digital
- Period maps under the lamp.
- The 1860s school photo (A).
- The cotton crash told through the dock engraving and a real bill-of-exchange scan (A and B).
- Hand-written ledger entries instead of monospace sums.
- Small film clips shown as projected film (gate, flicker), never floating in a void.

**3.4 People, not props.**
- The will as a real typewriter strike, without the dot row.
- Hold longer on Dorabji and Meherbai together.
- 2–3 archive photos of Jamshedpur workers and their township.
- The 1924 cross-cut between the workers and the bank counter (A).
- Portrait cutouts either go onto the desk as prints, or get matched grain and soft edges.
- The 1974 postcard with handwriting and a 1974 postmark, labelled ILLUSTRATION.
- An archive photo of J.R.D. with the Puss Moth in 1932, if one is licensable; the 1982 re-flight footage (A).

**3.5 Machine room.**
- The ownership flow in ink on vellum on the desk, with thread and pins (B), carrying A's warm pulse. Ends the only
  10.5 s freeze in the film.
- The T.C.S. dividend bar drawn in ink, not UI teal.
- The furnace cutaway as a cyanotype on the desk.
- The iron-to-wafer match cut as one clean dissolve.

**3.6 The two tragedies.**
- 26/11:
  - No lobby flowers. The empty staircase, or the 2008 dome (owner fetch).
  - Kang's name or portrait held still.
  - Silence after "at least thirty one people die".
- AI171 gets its own quiet card, not the 26/11 candle: a black frame, the flight's name and date, room tone. No aircraft
  imagery.

**3.7 Repeats capped.**
- The Bombay House façade: twice.
- The hard-hat clip: modern beats only.
- The 1907 crowd: once, plus one callback.
- The Upcott card: once, plus the 15:45 callback (the 8:40 repeat goes).
- The Tata Memorial atrium: once.
- The Nano plate: once.
- The IISc garden: once.

**3.8 Transitions.** Match cuts on a desk object (the coin, the punched card, the postcard) at 11:20, 14:00 and 18:40,
instead of year cards on unrelated plates. The 2008 calendar preview flip (Jan, Mar, Oct, Nov under "proudest, biggest,
hardest, darkest") is deliberate, but reads as a scramble: it becomes four pages fanned once, then the months in order.

**3.9 Sound.**
- Loudness range up from 3.5 LU.
- 2–3 s of room tone at:
  - 11:57 (before take-off)
  - 17:56 (26/11)
  - 19:35 (AI171)
  - 22:43 (before the box opens)
- The flight window: the music drops out and leaves cabin drone (A and B).
- Foley brought up:
  - loom clatter
  - harbour and rigging
  - street and bullock bells
  - coin, stamp and vault at the bank
  - furnace roar and the tap
  - engine cough
  - the card reader
  - the telegraph key
  - cleanroom air
- Integrated loudness stays at −14 LUFS.

**3.10 Owner fetch (from the phone, short credited excerpts):**
- the 26/11 Taj dome (2008)
- the Singur protests and the move
- the 1998 Indica TV advert (the CRT frame stays)
- JLR footage
- the 1982 J.R.D. re-flight
- a licensable Karambir Singh Kang portrait
- a 2022 Air India handover image

## 4. Kept (both reviews praise them)
- The Imperial Bank padlock
- The Dholera 2022→2025 satellite pair
- The wafer macro
- The Puss Moth "preserved today"
- The Indica advert in the CRT frame
- The steelworker's family
- The closing roll call (2 s longer)
- The box that closes at 0:10 and opens at 22:45
