# Picture plan v6: The Entire History of Tata (22:29, 60 fps)

*Creative director's plan for the v6 recording (owner's request 2026-10-27: "use as much creativity as possible, the
film should be extraordinary"). It replaces the picture columns of `script/screenplay.md` (v3) and the timings of
`shotlist.md` (v4). Frames come only from `vo/timing.json` through `T.sentence()` / `T.word()`; sentences are named
below by their first words. Asset ids are the `id` column of `../media_manifest.csv` (needs list: `shotlist.md`).
Systems are in `lib/remotion/` (README). Rules: CLAUDE.md, PLAYBOOK §6, §8, §10.*

## 1. The film's idea in one line
**Every Tata gamble is a thing someone put on a counter.** A diamond on a bank counter (1924), coins on a share-office
counter (1907), a car on a Detroit table (1999), a tiny car under TV lights (2008), shares on a trust's ledger (2026).
The camera keeps coming back to **a counter seen from the same low angle**: that is the film's visual rhyme, and the
last shot puts the viewer at it.

## 2. Signature moments (chosen from 9 candidates; why each one)
1. **The diamond becomes the furnace** (cold open → "The Answer" → chapter 3). The diamond's facets fill the frame,
   the white light warms to orange, and on a hard cut the same orange is molten iron pouring (real footage). *Why:*
   it states the whole film (a jewel turned into steel) in one cut, with no words.
2. **The empty place in the queue** (chapter 3, "Would you have done it?"). The INK queue of 1907 shuffles forward;
   one place is empty, lit, waiting. The camera drifts into that gap and stops: the viewer is in the line. It returns
   in the last minute ("That part is yours"): the gap glows again and the film ends on it. *Why:* it turns the
   narration's direct questions into a picture, and pays off the middle-class lens without a single extra word.
3. **The furnace cutaway** (chapter 3, "So how do you turn a hill of red rock into steel?"): each charge drops on its
   word, the blast races the bustle ring, the tap bursts on "glowing like lava". Already built (`BlastFurnace`).
4. **The ledger and the counter** (chapter 3, "about eight thousand Indians"): the counter rolls in Indian grouping
   while 8,000 bronze INK dots stream into the share office and fill a map of India; it lands on ₹2,31,00,000 exactly
   on "Two crore thirty one lakh rupees".
5. **The Taj, twice, on one dome** (chapter 1 → chapter 7). The 1903 archive photo of the dome, pushed in to a fixed
   frame and held. In chapter 7 the same framing returns at night, smoke drifting over it (real 2008 photo). A slow
   dissolve between the two at "Jamsetji's hotel. The one he opened in nineteen oh three." *Why:* planted in the VO
   ("Hold on to this hotel"), it has to be planted in the picture too.
6. **The silence** (chapter 6, "They fly back the same evening"): the score stops, room tone only, a night plane window
   and a slow minute counter (90) with no ticking. "Hold on to that silence" holds 1.5 s of near-black. Chapter 7
   pays it off: the same window, in daylight, as "you are doing us a big favour" lands.
7. **The 2008 desk calendar** (chapter 7): four pages torn, January, March, October, November; the November page
   does not tear: it darkens, and the calendar is left on the desk (`DeskCalendar`).
8. **The ownership machine** (The Answer): the trusts' two thirds pours in molten; the Dorabji trust's 28% cools to
   gold over the diamond's glint (`OwnershipMachine`). The diamond, last seen on the counter, is the light inside the
   structure.
9. **The roll call** (The Answer, "A priest's son…"): each of the six phrases snaps back to that person's own shot
   from earlier in the film, two seconds each, in the same framing (Navsari street, the queue, the diamond, J.R.D. in
   the cockpit, the postcard, the shovel at the furnace), cut on each full stop, with a single sustained cello note.
   Real photos for real people; INK only for the anonymous savers.

Rejected: a 3D globe of Tata companies (a corporate reel, not a story); a "rich list" scroll of real billionaires (a
real-person list implies claims we haven't checked); recreated handwriting of Sudha Murty's postcard (would be a fake
document, §8.6).

## 3. Grammar for the whole film
- **Base layer** by preference: archive photo with 2.5D depth parallax (`DepthPhoto`, to build) → real or licensed
  footage → INK stage → 3D/2.5D system. Never a flat card. A visual change every ~3.5 s; long sentences get a camera
  move inside the shot, not a cut.
- **Colour by era** (grades in `Photo.tsx`): furnace orange and soot (1839–1924) → sepia with aviation blue (1925–1978)
  → steel grey and glass (1991–2012) → ember and smoke (26/11) → cleanroom cyan (2013–2026). The diamond is the only
  white point in the film; the ownership machine's glint is that same white.
- **Stamps** (`Stamp`): every new time and place is engraved on screen the moment the voice says it: "NAVSARI · 1839",
  "KARACHI · 15 OCT 1932 · 6:30 AM". Chapter cards are in-world: the chapter's search title stamped into the first
  shot's surface (steel, paper, glass) for 2 s, never a black slide.
- **Questions on screen:** no. The VO asks; the picture answers or withholds. Questions never appear as text.
- **Honesty tags** (`HonestyTag`): RECONSTRUCTION on the 1924 bank, ILLUSTRATION on every INK and 3D system, ARCHIVE is
  implied for photos (credit in the description), "AS TOLD BY TATA" small under the Upcott and Ford lines.
- **Faces of real people** only from real photographs, never INK, never AI, never drawn.
- **Transitions:** cuts on the voice. Whip-pans only between eras inside one chapter. One match cut per chapter at most.
- **Pauses are never dead:** every chapter break (1.4 s) is a sound-led transition: a whistle, a gust, a page.

## 4. Chapters

### Cold open (0:00–1:27) · ember, brass, night · score: one low drone, a clock
| Beat (VO starts) | Picture | Systems / assets | SFX |
|---|---|---|---|
| "Bombay. Nineteen twenty four." | Inside a real moment, moving: 1920s Bombay street archive photo with depth parallax, tram and dust; stamp BOMBAY · 1924 | DepthPhoto A001 | tram bell, street |
| "A man walks into a bank…" | RECONSTRUCTION: the bank's tall doors (Imperial Bank building photo, parallax) → a low-angle counter in warm lamp light; a velvet case slides into frame | A002, 3D/2.5D counter set, real velvet-case/diamond footage A003v | door, footsteps |
| "Two hundred and forty five carats…" | Case opens: white light first, then the stone; `GemCompare` to scale beside the Koh-i-Noor, as it is today | GemCompare, A003 | glass shimmer |
| "Is he here to sell it? No…" | The case pushed across the counter; a bank ledger and a pen (reconstruction) | counter set, A007 | paper |
| "Ask any Indian family…" | INK: a mother's hands untying a small cloth bundle of gold bangles on a kitchen floor, a family watching (anonymous, today's India, warm lamp) | InkStage, new INK props: bangles, bundle | cloth, bangles |
| "So why is he doing it?" | Back on the diamond, tight; the light flickers like a flame | A003 | — |
| "Because more than fourteen hundred kilometres…" | India map: Bombay → Jamshedpur arc, "1,400+ KM"; land on the jungle town → INK pay-window queue, one worker looks at an empty palm | IndiaMap, PayWindowQueue over A004 | furnace hum, murmur |
| "You may never have heard his name. Sir Dorabji Tata." | ARCHIVE portrait, slow push, lower-third SIR DORABJI TATA · 1859–1932; "Tata Steel" stamped on a steel plate | A005, Stamp | thud |
| "Now look around you today…" | Four fast real shots on the words: salt pouring, tea poured, a steel bridge, a plane overhead; on "Tata." a bronze TATA hallmark is stamped into each, then the four freeze as a strip | A006a–d | pour, clang, jet, stamp |
| "And yet you won't find a single Tata…" | The strip slides away; a gold-leaf ledger page of the world's richest (ILLUSTRATION, no names, blurred lines) rolls past; a gap with no name | ledger rig | music out |
| "How is that possible?" | Silence; the gap holds | — | silence |
| "The answer is in this bank…" | Back to the counter, the diamond; its facets reflect fragments of 2026 headlines (real, credited, blurred except the words "Tata Trusts", "Tata Sons") | A003, J005 headlines | low thud |
| "But to understand why…" → "…a small town in Gujarat." | Signature 1 tease: the diamond's light swells to fill frame and dissolves into dawn light on a small-town street (Navsari archive / period Gujarat town) | A003 → B013 | wind, temple bell (far) |

### 1. The dreamer (1:27–6:03) · sepia and furnace orange · score: low strings, tabla enters at the mill
Long chapter (4.6 min): five scenes, each its own look so it never feels like a timeline.
1. **Navsari (1839), the priest's son** — Navsari street/fire temple exterior (archive or present-day photo, parallax),
   stamp NAVSARI · 1839; Jamsetji portrait enters on "You already know his name"; the three generations as three
   archive frames sliding like plates (priest, shop, business) on "For generations…". "Think about that…" → INK: a
   father at a fork in a road (respected path lit, risky path dark); "The fees come first." → INK: a mother counting
   coins into a school-fee envelope (anonymous, today).
2. **Bombay and Shanghai (1853–1864)** — Elphinstone College (archive), Bombay harbour with ships (B001), a route
   line Bombay → Shanghai on a period-style sea map; "It's going well. And then…" freeze → the 1864 voyage: a ship
   (archive engraving), cotton price chart drawn as a falling line on ledger paper (ILLUSTRATION, no fake figures:
   the line has no numbers), "The papers are worthless" → a paper bill crumpling (macro footage).
3. **The fall and the restart (1864–1868)** — Bombay 1865 share-mania crash: archive of Bombay streets/banks, a
   ledger with red ruled lines, debts listed as blank lines being crossed off one by one on "face every debt";
   "Do they give up? No." hard cut to a British army supply line (1868 Abyssinia expedition archive, B014);
   "Twenty one thousand rupees" → `Counter` lands on ₹21,000 with a coin stack to scale.
4. **Cotton out, cloth back** — a looping map: cotton bales sail from Bombay to Lancashire, cloth returns, money arrow
   flows out (`MapRoute` world variant); Lancashire mills archive (B002); "Why send our cotton away…" → Indian cotton
   bolls footage → Empress Mills archive (B005), stamp NAGPUR · 1 JAN 1877, Delhi Durbar 1877 archive (B006) on
   "Queen Victoria is declared Empress of India". Opium line said plainly over a sober archive of the China trade
   (B004: ships/warehouses only, no sensational imagery), no music change, no softening.
5. **Workers, the Taj, three dreams** — pension: INK mill workers at a ledger window, one old worker handed a pension
   slip; "Think about your own first job" → INK office worker today reading an offer letter; the 1895 words as a
   document (archive page if found, else typeset quote card on period paper labelled with source) with the highlighter
   on "healthy workers"; Taj myth: an old postcard of the Taj (no gimmick stamp); the picture pulls back from the postcard to the real 1903 photo (B009), stamp BOMBAY · DEC 1903, **the dome framing for
   signature 5**; electricity: the photo's windows light up one by one (ILLUSTRATION); "Hold on to this hotel" holds on
   the dome. The three dreams: three blueprints unrolled on a desk, each animates: steel (furnace silhouette), power
   (Ghats rain footage B010 → lake), science (IISc building B011); "thirty lakh rupees" counter; "iron ore, the right
   coal and water, all in one place" → three map pins that never sit together (they slide apart each time).

### 2. The letter (6:03–7:18) · cool jungle green inside the orange · score: suspense pulse
- Chapter opens on the three pins failing ("One site has ore, but the coal is useless"): pins drop and dim on a map of
  central/eastern India.
- **The letter (Feb 1904)**: an envelope arrives on the desk (object only, not a recreated letter), stamp FEBRUARY ·
  1904; P.N. Bose portrait (C003) with lower-third PRAMATHA NATH BOSE · GEOLOGIST; Mayurbhanj hills footage/photo (C004)
  with the India map pinning MAYURBHANJ · ODISHA.
- **The death**: "three months later, on a trip to Germany" → a still, cold frame: Bad Nauheim period photo (C005) or a
  plain European rail station archive, stamp GERMANY · MAY 1904; "He never sees those hills" → the three blueprints
  from chapter 1 roll themselves up one by one on "No steel plant. No power company. No institute."
- **Dorabji in the jungle**: Dorabji portrait → INK prospecting party with bullock carts in forest (anonymous men; no
  Dorabji as INK) over jungle footage; Sakchi: the two rivers meet (C007 modern aerial of the Subarnarekha–Kharkai
  confluence) with three pins finally landing together: ORE · COAL · WATER.
- **Money**: London (C008 archive), a door closing (sound only, "The answer is cold." on a frosted window);
  "They ask India." → whip to Bombay crowd archive (D002): chapter break on a rising murmur.

### 3. The eight thousand (7:18–9:16) · furnace orange at full · score: tabla pulse builds
- "Bombay, nineteen oh seven. The share office opens." → INK Crowd1907 at the share office door, light spilling out.
- Sahlin's words: the quote on a period page (attributed in a small line "AS RECORDED BY A TATA MANAGER"), highlighter
  on "offering their mites"; "Their few coins" → macro of old Indian coins (real British-India coins, footage or photo,
  A011) dropping into a palm.
- Signature 4 (counter + 8,000 dots) on "about eight thousand Indians… Two crore thirty one lakh rupees".
- "Now imagine you're standing in that line…" → Signature 2: the queue, the empty place, the drift in; "maybe for a
  daughter's wedding" → INK woman's hands untie a savings pouch; "Would you have done it?" holds on the gap, 1.2 s.
- Upcott: a typed memo on a 1907 desk (period typewriter footage + `Paper` document with the line, ILLUSTRATION tag and
  "AS TOLD BY TATA" — never presented as a real document), the highlighter on "eat every pound of steel rail".
- Signature 3 furnace cutaway on "So how do you turn a hill of red rock into steel?" through "glowing like lava", then
  the match cut to real molten iron footage (D004).
- "The first iron flows in December nineteen eleven" → YearRoller 1907 → 1911 → 1912 with stamps.
- WWI rails: archive of a WWI railway in Mesopotamia/East Africa (D005).
- "indigestion": the Upcott memo returns, a dry beat: a single rail section lands on the memo with a thud.
- "Jamshedpur. After the man who never saw it." → Jamshedpur 1919–20s archive (D006), stamp JAMSHEDPUR · 1919, then
  the Jamsetji portrait reflected in the window light.
- "His other dreams come true too" → the three blueprints from chapter 1 unroll again, now as photos: IISc (D007),
  Ghats lake and power house.
- "It should be a happy ending…" → warm hold; "It isn't." hard cut to black with one ember.

### 4. The diamond (9:16–11:26) · soot and gold · score: solo cello enters at Meherbai
- Strike 1922 (E001 labour archive); "Prices fall" → imported steel at docks (E002); `Counter` "close to two crore".
- "So we're back in that bank in Bombay." → **the counter shot from the cold open, exactly matched.**
- The Jubilee's history: South Africa 1895 (E004 mine archive), the Diamond Jubilee 1897 (archive), Meherbai portrait
  (E003) — the emotional centre: slow push, the only portrait in the film lit with a warm rim of the diamond's light.
- "Imperial Bank of India" → building archive (A002) with the SBI name today (present photo).
- "The loan comes through. The furnaces stay lit. The workers get paid." → three quick shots: a stamped loan paper
  (object), real furnace footage, INK pay window (the same queue as the cold open, now the window opens and a worker
  closes his hand on his wage).
- "It was her diamond…" → Meherbai portrait again, held; "could eat" → INK family meal in a worker's quarters.
- Will and deaths: dates as stamps on plain dark paper, no theatrics; leukaemia line stated simply.
- "He leaves everything to a charitable trust" → the three things land on a trust ledger: shares (Tata Sons certificate
  object, ILLUSTRATION), property, the jewellery (21 small light points, the Jubilee the brightest).
- "THE SIR DORABJI TATA TRUST" engraved into brass.
- Tata Memorial Hospital 1941 archive and today (E005); "If you, or someone you love…" → present-day hospital corridor
  footage (respectful, no patients' faces).
- "But the shares in Tata Sons? Those the trust keeps." → the share certificate stays on the ledger, everything else
  fades; "It's the key to the ending." → the certificate is locked into a drawer with a click; that drawer opens in The
  Answer.

### 5. The pilot (11:26–14:00) · sepia with aviation blue · score: brass warmth
- J.R.D. photos (F001), archive only (he is a real person); the "without pay" beat shows a pay ledger column with a
  blank line.
- "India's first pilot licence" → the licence as an archive photo if found; otherwise J.R.D. beside an aircraft. No
  licence number on screen unless the archive shows it.
- **The flight, 15 Oct 1932**: stamp KARACHI · 15 OCT 1932 · 6:30 AM; Puss Moth archive/footage (F002); `MapFlight1932`
  route Karachi → Ahmedabad → Bombay (period map, faint dashed borders); "No radio. Can you imagine flying like that?"
  → cockpit-view dawn sky footage, engine only; "a mud flat at Juhu, by the sea" → Juhu archive (F003).
- Air India 1940s–50s (F004: Constellation, Maharajah poster); "chairman of the whole Tata group" lower-third.
- 1953 takeover: a government gazette-style page (archive if found) → "without a salary, for twenty five years" → a
  25-tick year roller.
- T.C.S. 1968: punched cards footage (F006) stamped "T.C.S." — plant the name large; "One day it will carry the whole
  empire." → a single punched card left glowing at the edge of frame (callback in chapter 8).
- **The postcard (1974)**: newspaper job notice texture (ILLUSTRATION) with the line "Lady candidates need not apply"
  set in period type, highlighted; a blank 1970s Indian postcard (object) turned over; her question as narration only
  (no text, no handwriting); telegram footage/object "COME FOR AN INTERVIEW · PUNE" (telegram stamp style, labelled
  ILLUSTRATION); Sudha Murty photo (F008, CC) on "You may know her name".
- 1978: the Air India Maharajah/aircraft frame dims; "favourite child was taken away" → a slow pull-back from an Air
  India aircraft of the era, held in silence (the shot that returns in 2022).

### 6. The humiliation (14:00–16:06) · steel grey and glass · score: a tense pulse
- 1991: India's opening (G001 archive/news photos), stamp NEW DELHI · 1991.
- Ratan Tata (G002 CC photos): parents, grandmother, architecture (Cornell archive photo), "came home".
- "two years shovelling limestone" → Tata Steel works footage/photo (A004/I-series) + INK: a young man's hands and a
  shovel only (hands, not face: anonymous and honest), the same furnace system glow from chapter 3.
- Indica (G003): 1998 launch photo, "one lakh fifteen thousand" counter of booking slips stacking.
- "Then the complaints start. Quality. Power." → two cold words stamped on steel.
- Detroit 1999 (G004): Ford HQ exterior, the room as a long glass table (ILLUSTRATION 2.5D), the words "a favour" as
  a quote card with "ACCORDING TO PRAVIN KADLE".
- Signature 6, the silence (see §2).
- "It does not sell. It fixes the car. And it starts buying." → three cuts on three verbs: a wrench on an engine
  (footage), Tetley (G005), Corus.
- Corus 2007: British Steel / Port Talbot archive (G006); "about twelve billion dollars" counter in dollars.
- Signature callback: the 1907 Upcott memo slides back in; a 2007 headline (real, credited) slides over it.
- "His proudest moment. His biggest deal. His hardest defeat. And his darkest night." → four calendar pages flick past
  as a tease (the 2008 calendar on its desk).

### 7. Twenty oh eight (16:06–18:08) · each month its own light · score: four short movements
- January (Delhi Auto Expo): DeskCalendar tears to JANUARY → Nano unveiling photo (H001), TV lights flare; "A car for
  one lakh rupees" counter; "a promise is a promise" held on the car.
- INK ScooterFamily (built) for "Four or five people, on one scooter"; "Maybe you were the child sitting in front" →
  the camera finds the child in front; "a roof" → a car roof outline draws itself over the family (ILLUSTRATION).
- March: calendar → JAGUAR · LAND ROVER cars and factory (H003); "two point three billion dollars" counter; the
  Detroit plane window returns in daylight on "you are doing us a big favour" (signature 6 payoff); "Ford has never
  confirmed either line" as a plain lower line.
- October: calendar → Singur (H004: the plant, fields, protests photographed without party symbols), map pin moves from
  West Bengal to Gujarat (Sanand) along a route.
- November: the calendar page does not tear: it darkens. "The twenty sixth of November, two thousand eight. Night." →
  signature 5 (the dome, 1903 → 2008 smoke). Staff: no reconstruction of violence. INK, very restrained: kitchen
  doors, a corridor with the lights going out one by one, figures guiding others in the dark (silhouettes, no
  weapons, no victims); "Waiters. Cooks. Managers" → three still INK portraits of uniforms, faceless, held.
  Karambir Singh Kang: real photo (CC) only if one is licensed; otherwise his name as a quiet stamp on black. "At least
  thirty one people die at the Taj." → black, one candle flame (footage), the number stamped small. "The fighting lasts
  three days." → three slow dissolves of the dome at dawn.
- "Twenty five days later, the Taj opens its doors again." → Taj reopened (H006), the doors, morning light: the dome
  in the 1903 framing a third time, lit.

### 8. The bill (18:08–19:46) · cold daylight · score: low, honest
- Port Talbot: furnaces, then the 2024 shutdown (I001); "Was Corus worth it? People still argue" → split frame, two
  headlines, unresolved.
- Nano end: a Nano parked, dust; "Production ended in twenty eighteen" stamp.
- "So does Tata always get it right? No." → hold.
- 2016: Bombay House (I002); Cyrus Mistry and N. Chandrasekaran photos (I003), Supreme Court exterior (photo);
  no party/political colours.
- T.C.S. now: the punched card from chapter 5 glows and dissolves into a modern TCS campus (I004); "about eighty seven
  percent" → a single bar of profit flows up to Tata Sons, 87% of it lit cyan (to scale).
- 2022: the 1978 Air India pull-back shot returns, reversed: push-in on the new-livery aircraft (I005); "J.R.D. did not
  live to see it" → J.R.D. photo, held.
- AI171: black; a single candle; the flight number and date as a quiet stamp; no aircraft image, no crash imagery,
  music stops entirely; "We remember every life that was lost." holds 2 s past the line.

### 9. The Answer (19:46–22:17) · charcoal and gold, then cleanroom cyan · score: silence, then cello
- "So. Back to the bank in nineteen twenty four" → the counter, the diamond (cold open frame, third time). The drawer
  from chapter 4 opens: the share certificate.
- Signature 8, the ownership machine, on "about two thirds… charitable trusts" → "twenty eight percent" → the rest.
- "a share of the profit flows up to those trusts. And out, into hospitals, research and scholarships." → the machine
  gains pipes: the cold open's real salt and tea shots feed coins up; three outflows to real photos: Tata Memorial, IISc, a scholarship classroom (stock).
- Ratan Tata's death and tribute: NCPA October 2024 photos (J002), crowds; "He was given a state funeral."
- Noel Tata (J003). 2026: Bombay House at night (J001); the board vote shown as a ledger of hands raised (ILLUSTRATION,
  no faces), one hand down; "The trusts say… Tata Sons says…" as two plain attributed lines.
- R.B.I.: RBI building (J004), "big finance companies must sell shares to the public" → BSE exterior (J004); "The
  R.B.I. said no." → stamp.
- "Who wins? I honestly don't know." → the machine at rest, both sides lit, nothing moving except dust.
- Signature 9 roll call on "A priest's son…" (six cuts).
- "Savings. Pride. A diamond." → three echoes: the pouch, the plane window, the diamond.
- "That part is yours." → signature 2 payoff: the empty place in the queue glows; the camera settles in it.
- "Who should a company like this really belong to?" → the diamond, alone, on the counter, slow push; held.
- "What do you think? Tell me in the comments." → the counter is empty; the light stays.

### Outro (22:17–22:29)
- The brand sting (`brand/remotion/src/Sting.tsx`) over "This is Built on Bharat…"; "Next in Empires of India…" →
  a 2 s tease of the next film (Amul: a milk can, morning light, Anand stamp) and the end-screen layout.

## 5. New shared pieces to build (lib/remotion)
1. `DepthPhoto`: an archive photo displaced by its depth map on a subdivided plane (`@remotion/three`) for a true dolly;
   depth maps made offline (`scripts/depth_map.py`, Depth Anything V2 Small, Apache-2.0) and committed beside the
   manifest as PNG. Fallback: two-layer cut-out parallax.
2. `CounterSet`: the bank counter set (2.5D: wood, brass grille, lamp pool, ledger) used four times, always the same
   low angle (`counterCam`).
3. INK additions: bangles bundle, savings pouch untie, school-fee envelope, an office worker with a letter, prospecting
   party with bullock cart, the Taj corridor silhouettes (dignified), a shovel-and-hands close shot.
4. `QuoteCard`: an attributed quote on period paper (typed, never a fake document), with `Highlight` and an
   attribution line; used for Sahlin, Upcott, the 1895 words, Kadle.
5. `TrioPins`: three resource pins that slide apart (fail) and finally land together (Sakchi).
6. `Blueprints`: three dream blueprints that unroll, roll up (1904), and unroll as photos (1919).
7. `RollCall`: frames re-used from earlier shots with matched framing (exports each shot's frame as a still).

## 6. Order of work (one session, owner 2026-10-27)
One session does everything, in this order, pushing every finished piece: sourcing per chapter (manifest, contact
sheets, Drive `tata-history/media/`, depth maps) → shared pieces (`DepthPhoto`, `CounterSet`, `QuoteCard`) → chapters
in film order: handoff doc (`scenes/NN_<name>.md`, §10.3) → code in `remotion/src/chapters/` → stills every 2 s
reviewed → 1080p preview → 4K shards. Independent reviews (audience, fact-check, fresh-eyes picture) run in their own
session and are archived after.
