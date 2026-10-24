# Built on Bharat: production playbook

The one reference doc for this repo. `CLAUDE.md` holds the short rules every session must follow; this file holds
everything else: full specs, how-tos, measurements and the reason behind each rule, so a future session can tell when a
rule applies and when it doesn't. Add new lessons here (with the reason), never in new doc files.

Many lessons come from the sister channel's repo, `mkmk749278/Creator` (*Be Practical with Kishore*, Oct 2026). Where a
rule came from there, it says so, with the measured reason. Its files are a reference only.

**Contents**
- Part A: How we work. 1 Owner and delivery · 2 Claude and effort · 3 Parallel sessions
- Part B: The channel. 4 Identity, audience, emotion and respect · 5 Story architecture · 6 The look ·
  7 Narration and voice · 8 Visual storytelling toolkit
- Part C: Production. 9 Facts and honesty · 10 Remotion engine · 11 Media sourcing · 12 Sound ·
  13 Render, deliver, YouTube package · 14 Review gates · 15 Tools to bring from Creator
- Part D: 16 Lessons log · 17 Decisions and open questions
- Part G: the owner's directives, verbatim

---

# Part A: How we work

## 1. Owner and delivery

- **Kishore works only from an Android phone** (GitHub app, Claude app, Termux, SSH to a VPS). No PC. *Why:* every step
  must run in a cloud session, GitHub Actions or the VPS, and every result must open on a phone: a Drive link, a JPG
  contact sheet, a code block in the chat.
- **Polished only (owner, 2026-10-24: "don't ever give the test file … even to show me as sample, that should be polished
  one only").** The owner never receives a test render, draft cut, placeholder scene, rough thumbnail or "sample". Tests
  live and die inside the session. When a phase report needs pictures, they are finished frames from the final build.
  *Why:* the owner judges the channel's quality from what he sees; a rough sample wastes his review and lowers the bar.
- **Google Drive is the delivery shelf.**
  - Channel folder: **`Built-on-Bharat`** at the top of My Drive, id `1rp3UL-oAMrSoEZXHIU5L78qIukdgzR1n`
    (created 2026-10-24, a sibling of the other channel's `Creator` folder, which we never write to).
  - Layout: `Built-on-Bharat/<slug>/` one folder per film (the repo slug); `Built-on-Bharat/_Channel/` for channel art
    (logo and banner originals are there since 2026-10-24); `Built-on-Bharat/<slug>/footage/` for clips the owner
    fetches on the phone. Nothing loose in the top folder.
  - Videos: `scripts/upload_gdrive.sh --sub <slug> FILE…` (pinned rclone; prints a private view link the owner opens
    signed in). It needs **`GDRIVE_RCLONE_TOKEN`**, which is already set in this environment (it is the same Drive
    account as Creator). The script never turns on "anyone with the link".
  - Small text files (description, SRT, review notes) can go through the Google Drive connector (`create_file` with
    `parentId` = the film's folder id, `disableConversionToGoogleType: true`). The connector can't carry video files.
  - Deliver the 4K master and a 1080p copy (the phone plays the 1080p one smoothly).
- **Git:** all work lands on `main`. Each session uses its own branch and folder, opens a PR to `main` and merges it the
  same day. *Why:* on Creator, nine stale session branches hid finished work. Sessions can't delete branches or push
  tags: tell the owner which branch to delete.
- **Phases:** at the end of each phase, stop and report in plain words: what was built, what was checked, what is left,
  and any rights or Content ID risk.
- **Once the owner approves a cut, stop editing it.** Deliver exactly that cut. *Why (Creator):* slipping in edits after
  approval cost a review round.
- **Ask, don't guess, on the owner's decisions** (voice, topic, anything paid), but never ask about things a sensible
  default or the repo answers.

## 2. Claude and effort

- Sessions run on Claude Opus 5.5 (`claude-opus-5-5`). **Don't limit yourself (owner, 2026-10-24: "don't ever limit
  yourself as Opus 5.5, you can do a lot").** It reads images precisely (use it on every contact sheet and frame), writes
  real engine code, holds a whole film's research in context, and rarely invents sources. So: build real 3D instead of
  flat icons, write a custom scene instead of reusing a template, review every frame instead of a sample.
- Effort: `high`/`xhigh` for building, `max` for fact-checks and final reviews. Never lower effort, skip a QA round or
  shrink research to finish sooner. *Why:* a wrong claim or a slide-like shot on a public channel costs more than an
  hour of compute.
- **Name the looks to avoid.** Asked for visuals with no direction, the model falls back on a few stock styles (glass
  cards, neon dashboards, centred title on a gradient, icon grids). "Avoid a generic look" just swaps one default for
  another. §6.4 lists ours; extend it whenever a frame looks templated.
- Knowledge stops at June 2026: every fact comes from collected sources (§9).
- If a film ever calls the Claude API from code (it doesn't need to; sessions do the work), follow Creator's
  `pipeline/llm.py` rules: model and effort from config, thinking on, `output_config.effort` set explicitly, JSON via
  `output_config.format`, read only `text` blocks, check `stop_reason`, stream big requests, cache the shared prefix.

## 3. Parallel sessions

Measured on Creator (Oct 2026):
- Each cloud session is its own VM: about **4 vCPU, 16 GB RAM, 30 GB disk**. N sessions = N× CPU for rendering.
- Subagents share their session's VM: they speed up research, fact-checks and contact-sheet reading, not rendering.
- **All sessions share one usage limit.** Four scene sessions plus a coordinator hit the 5-hour limit ~10 minutes after
  launch, twice. *So:* at most **two heavy sessions beside the coordinator**; each pushes after every finished scene.
- **All sessions share one outbound IP**, so parallel sourcing multiplies 429s: **one sourcing session only**.
- Idle VMs pause and can be reclaimed: start long jobs detached, watch them with Monitor, make them resumable.
- A coordinator starts and steers others with `create_session` / `send_message` / `get_session` / `list_events` /
  `archive_session`. Archive sessions when done.
- Large files between sessions: Litterbox (`curl -F reqtype=fileupload -F time=72h -F fileToUpload=@f.mp4
  https://litterbox.catbox.moe/resources/internals/api.php`, ≤ 1 GB, 72 h; md5-checked on Creator). Commit a
  `<file>.url` with URL + md5. Only our own renders and licensed assets go there.

**Plan for one 12-minute film** (60 fps, 4K):
| Session | Job |
|---|---|
| S0 coordinator | Locks script, VO, timing and scene handoffs; splits the film into ~2–3 min parts at scene boundaries; pins encode settings; final assembly, mix, review, delivery |
| S1 sourcing (only one) | All downloads at a polite rate, contact sheets, `media_manifest.csv` |
| S2–S3 scenes/render | Each owns `films/<slug>/remotion/src/scenes/<range>` and renders its frame ranges |

---

# Part B: The channel

## 4. Identity, audience, emotion and respect

**Name:** Built on Bharat · **Handle:** @BuiltOnBharat · **Tagline:** *The empires and habits that built a nation.*

**What we make:** cinematic documentaries about how India was built and how it is being built: the empires (companies,
institutions, infrastructure, missions) and the habits (how Indians save, eat, trade, travel, celebrate) behind them.
The banner shows the range: the Taj Mahal Palace hotel, steam railways, a steel plant, port cranes, an Isro rocket, an
Air India jet, offshore oil rigs, a U.P.I. QR code, a silicon wafer.

**Reference standard:** the owner names *ColdFusion* and *Built On You*-style editorial documentaries (Part G.1); the
bar is a broadcast documentary, never a slideshow. Competitors are a reference, never a ceiling: every film aims to be
the best film on its subject in research, story, picture and sound.

### 4.1 The owner's three priorities (2026-10-24)
1. **Indian emotions, Indian reactions, Indian humanity.** The story is carried by people and how they felt: the
   labourer who built the dam, the clerk who kept the books, the mother who bought the first share, the crowd outside
   the gates on launch day, the engineers hugging in the control room. *How:*
   - **A named human in every chapter**: a face, a name, what they wanted, what they risked. When the record has no
     name (the thousands who built a railway), honour them as a group with real photos and real numbers.
   - **Reaction beats:** after every big turn, show how India *felt*: archive crowds, newspaper headlines of the day,
     letters, the first customers, today's users. Real reactions only (archive, footage, quoted letters, documented
     events), never invented ones.
   - **Everyday India is the stage:** railway platforms, chai stalls, kirana shops, mills, monsoon streets, festival
     lights. The viewer should recognise their own life in it.
2. **Respect for India.** Proud, never jingoistic; honest, never cynical.
   - Celebrate Indian engineering, enterprise and persistence. Name the obstacles honestly (colonial rule, the licence
     raj, failures, scandals), then show who pushed through.
   - **No hype words or "the West is shocked" framing** ("SHOCKED the world", "China is TERRIFIED", "destroyed"). *Why
     (Creator research, 2026-10-21):* they win clicks elsewhere but cost trust, and trust is our edge.
   - **Never mock** a region, language, religion, caste, community or class. No regional stereotypes for humour.
   - **Tragedies with dignity** (Bhopal, industrial accidents, crashes, partition, riots): no gore, no victims' faces for
     shock, attributed figures, the human cost stated plainly and respectfully.
   - Colonial history is told with facts and Indian perspectives, not anger for its own sake.
   - Politics: facts and attributed claims, both sides' numbers where contested, no party colours or symbols.
3. **Cinematic storytelling with checked facts.** See §5 and §9.

### 4.2 The audience
- Indians across all states (and the diaspora) who watch English documentaries: students, engineers, professionals,
  business-minded viewers, older viewers who remember the events. Most watch on a phone, often with distractions.
- **Pan-India English** is the moat (Creator research, 2026-10-21): a viewer in Chennai, Kochi, Guwahati or Hyderabad
  who skips Hindi videos can watch ours. No Hindi tags.
- What pulls Indians in (Creator's data: 93% of its views came from two "India capability" films, 96–99% of them from
  the home feed): **India's own story told from inside India**, framed as a bet or a struggle with real stakes, with a
  real mechanism shown and an honest, proud ending.

### 4.3 Topics
- **Pick by demand × weak supply.** Before choosing, check YouTube autocomplete (`gl=IN`) for what people type and the
  top 20 results for what exists. Skip topics where a big channel already has a great 1M+ film, unless we have a story
  angle or a mechanism nobody showed. *Why (Creator):* its jet-engine film entered the most crowded India-defence topic
  and got 1/6 of the chip film's views.
- **Bet framing beats verdict framing:** "how a 19th-century Parsi trader bet everything on Indian steel" keeps the viewer
  watching to see what happens; "why India failed at X" ends the story before it starts.
- **Candidate slate** (every fact below is a lead to verify, not a claim):
  - *Empires:* Jamsetji Tata and the Taj Mahal Palace hotel; Tata Steel and Jamshedpur; JRD Tata's first airmail flight
    and the birth of Air India; Bombay High, the offshore oil find; Isro from Thumba to the Moon; the first train
    out of Bori Bunder; Indian Railways' locomotive works; Amul and Operation Flood; Infosys and the IT boom; U.P.I. and
    how India rebuilt payments; India's semiconductor bet.
  - *Habits:* the dabbawalas; gold-buying; the chai stall; the kirana shop vs quick commerce; the Indian wedding economy;
    the Sunday newspaper; the Maruti 800 and the family car; the STD/PCO booth.
- **One lane per playlist.** Group films into series (e.g. "Empires of India", "Habits of India"), each film teasing the
  next. *Why (Creator):* mixed topics confused who YouTube showed the channel to.
- **Pace:** one to two long films a week at most; never two films on the same topic within a fortnight. *Why (Creator):*
  five uploads in four days on a new channel split the test impressions.

## 5. Story architecture

We narrate like a movie. A film is a **story with a protagonist, a want, obstacles, a turn and a payoff**, not a list of
facts in date order.

### 5.1 The first minute (data from Creator's YouTube Studio, 2026-10-17)
On Creator's best films, about two thirds of the lost viewers were gone by 0:45, and the rest mostly watched to the end.
The drop lined up with a welcome line, logo sting and title card at 0:25–0:45 (47% → 33%). So:
- **0:00–0:08, the cold open:** inside a real moment, in motion, with stakes. A date and a place on screen. No logo,
  greeting, title card or "In this video". *Example shape:* "Bombay, 1903. A man who was turned away from a hotel…"
  (verify any such story before use; some famous origin stories are legends: say so if it is one).
- **0:08–0:25, the promise:** what the thumbnail and title promised is on screen and in the narration by 0:25: the
  paradox, the bet or the mystery.
- **0:25–0:55, the open loop:** tell the viewer what they will get and roughly when ("by the end, you'll see why that
  one decision still decides what you pay for steel today"). If a minute is named, it must be true in the final cut.
- **Targets:** ≥ 65% still watching at 0:30, ≥ 50% at 1:00, average view duration ≥ 35%.

### 5.2 The body
- **Chapters of 2–4 minutes**, each a scene with its own question, conflict and payoff, ending on a forward pivot into
  the next chapter ("He had the money. Now he needed the one thing no Indian had ever been allowed to build.").
- **Act shape** (proportions, not timings): setup (the world before, the want) → rising stakes (obstacles, rivals, the
  system) → the darkest moment (failure, loss, near-collapse) → the turn (the decision, the breakthrough) → the payoff
  (what it built) → the echo (what it means for India and the viewer today).
- **Show the mechanism.** How the furnace works, how the payment settles, how the rocket stages: one clear, animated
  explanation per chapter that needs it, a layer deeper than common knowledge. Viewers stay for understanding.
- **Real conflict holds viewers.** Creator's chip film's only retention bump was at failed fabs and a partner walking
  away. Don't hide the failures; they make the success mean something.
- **Emotional rhythm:** alternate tension and release. After a heavy beat, give a human or warm moment.
- **Reveals:** before the core reveal, 1–1.5 s of music silence, then a low impact as it lands. Use it once or twice a
  film, not every chapter.
- **Ending:** land the emotion, connect to India now (the steel in the viewer's bridge, the payment on the viewer's
  phone), one question for the comments, then the outro with the channel name and logo sting, and a ~10–15 s end screen
  with a bridge line to the next film over it (never a silent logo).

### 5.3 Story deliverables per film
`films/<slug>/brief.md` (topic, angle, why now, demand check) → `research/` (sources, timeline, people) →
`story.md` (protagonists, want, obstacles, turns, emotional beats, the chapter map) → `script/` (narration + screenplay)
→ `scenes/` (one handoff doc per scene, §10.3).

## 6. The look

### 6.1 Brand world (from the logo and banner, 2026-10-24)
The logo is an aged bronze medallion: gears, a sunburst, rivets, the engraved "BB" and "BUILT ON BHARAT" ring, over a
dark slate blueprint grid with flying sparks and warm light. The banner sets heritage (the Taj, a steam engine, blast
furnaces, cranes) against the future (an Isro rocket, a jet, oil rigs, U.P.I., a wafer) in the same charcoal-and-bronze
world. **That is our visual world: industrial heritage meets modern India, dark and warm, metal and light.**

- **Palette** (tokens in `config/brand.yaml`, from the owner's directive, Part G.1): background deep matte charcoal
  `#121212` / `#0D0E11`; accent bronze `#C57D3C` and gold `#D4AF37`; text white `#FFFFFF`; blueprint/muted `#8E929B`.
  Warm practical light (furnace orange, lamp gold) is the only strong colour besides real footage. Colour means
  something: bronze/gold = the story's key thing (the number, the name, the turn); muted = context.
- **Typography:** large, bold, editorial, with letter-spacing (Part G.1). Display: an engraved-style serif in capitals
  for chapter and place/date cards (the banner's "BUILT ON BHARAT" look); text: a clean sans for labels and counters;
  numbers in tabular figures. Fonts are vendored locally (OFL licences), never loaded from a CDN at render time.
- **Texture:** film grain, a ~30% vignette, dust and sparks in light beams, paper texture on documents, faint blueprint
  grid on diagrams. Never a flat colour or a plain gradient as a background.
- **Each film gets its own art direction inside the brand world** (a dominant texture, a motif, a colour temperature:
  furnace orange for steel, sea blue-green for oil, night cyan for U.P.I.). *Why:* YouTube's July 2025
  "inauthentic content" rule targets mass-produced templates, and a template look reads as low effort.

### 6.2 Three layers in every frame
| Layer | Content | Rules |
|---|---|---|
| 1 Base (full screen) | Real footage, an animated archive photo (parallax, push-in), a 3D/2.5D scene, a document on an isometric plane | Never motionless |
| 2 Atmosphere | Grain, vignette, light leaks, dust, sparks, smoke, optional 2.35:1 bars for dramatic scenes | Never hides the base |
| 3 Kinetic accents | Counters, dates/places, names, 2–4-word labels, highlights | Lower corners or on the object itself, on a dark scrim; readable on a phone |

### 6.3 Motion rules (owner's directive, Part G.1, plus Creator's measured lessons)
1. **Continuous micro-movement in every frame (the 3.5-second rule).** Nothing static: slow push-ins (scale 1.00 →
   1.06), pans, isometric tilts, parallax. A visual change (cut, angle shift, push-in, callout) about every 3.5 s;
   no unmoving frame over 1.5 s. Exceptions: a deliberate held reaction shot that itself moves (a slow push on a face).
2. **Easing:** `spring()` and eased `interpolate()` for everything; no linear camera or text moves.
3. **Text ≤ 15% of the screen**: dates, places, names, numbers, 2–4-word labels. **Never** paragraphs, bullet lists,
   full-screen text cards, icon grids or summary slides. *Why (Creator):* its first film was rejected as "a boring
   PowerPoint".
4. **Semantic lock:** every shot shows what the narration says at that second. Generic B-roll only where the narration
   is generic. *Why (Creator):* a railway crowd under "the audience" and a wedding ritual under "a family function"
   were both rejected.
5. **≥ 85% of the runtime is moving footage or animation**; stills only for authentic archives, always animated (§8.2).
6. **Real before made:** real event footage → real archive photos/documents → licensed stock → our own animation/3D →
   AI imagery (only where nothing real exists, never of a real person, labelled). At least a quarter of the picture is
   real-world grit (archive footage, headlines, documents, street and factory footage).
7. **Indian faces, places and money** in every stand-in. A European street, shop or face is a reshoot. No dollars or
   euros in a rupee story.
8. **No stock clip more than twice** a film (count clip sources, not shot rows). No anonymous office-workers-typing stock.

### 6.4 Looks to avoid (extend this list)
Floating glass cards, neon-on-black dashboards, a centred title + subtitle on a gradient, icon grids, emoji, whiteboard
maths, handwriting fonts, cartoon characters, generic "scientist with test tube", generic space/lab filler, stock
globes with fake glow, lens-flare overload, AI images with garbled text (the banner's rocket shows invented lettering:
never let that into a film).

### 6.5 Branding inside a film
- A small logo bug (the medallion at about 60% opacity, roughly 5% of the frame height) in the top-right corner
  throughout, clear of YouTube's overlays.
- **The channel is named, with the logo sting, only in the outro**; then the end card with end-screen zones. No
  welcome, sting or title card earlier (§5.1).
- Brand files: `assets/brand/logo_emblem_1024.jpg`, `assets/brand/banner_1920.jpg` (reference copies; full-size originals
  in Drive `_Channel/`). **Both originals carry the image generator's sparkle mark in the bottom-right corner:** remove
  it (clean crop or inpaint) before the logo is used in a film, the sting or a thumbnail. A clean vector or
  transparent-background version of the medallion is needed for the bug and the sting (§17).

### 6.6 Maps of India
Draw India with **its official boundary** (Natural Earth's India point-of-view countries file,
`ne_10m_admin_0_countries_ind.geojson`, public domain: full Jammu & Kashmir and Ladakh, Arunachal Pradesh, Andaman &
Nicobar and Lakshadweep). Never land-only shapes that merge India with its neighbours, never a map drawn from memory or an
unofficial source. *Why:* map-border law in India, and the owner flagged an inaccurate India map on Creator
(2026-10-16). Fill India, glow its edge, dim the neighbours. Rail network: DataMeet Indian Railways (CC0).

## 7. Narration and voice

### 7.1 The voice of the channel
A **storyteller**: warm, curious, proud, a little dramatic at the right moments, like someone telling you a great story
at night on a long train journey. Not a news reader, not a professor, not a hype YouTuber.

### 7.2 Cinematic writing
- **Scenes, not summaries.** Put the viewer in a place and a moment: "It's the monsoon of 1907. Sakchi is a village of
  mud huts and sal forest..." (example only, verify before use). Present tense for scenes; past tense for context.
- **Sensory texture is allowed** (the heat, the noise, the smell of coal smoke): it is how a film feels. It never adds a
  fact (§9.2).
- **People want things.** Say what the person wanted, what stood in the way, what they risked.
- **Questions the viewer is already asking**, out loud, then answer them ("So why would anyone build a steel plant in a
  jungle? Because of what was under it.").
- **Rhythm:** a long, flowing scene-setter, then a short punch. Never three sentences of the same length in a row, and
  never three or more very short sentences in a row. `...` before a number or a reveal; `—` for a turn; `?` on every
  real question. *Why (Creator, measured):* the TTS voice takes pitch and breath only from punctuation and sentence
  variety; uniform report-like sentences drone.
- **The breath test:** each sentence fits one natural breath. Nothing over ~25 words.
- **Simple words** an Indian from any state knows: build, money, buy, sell, work, factory, ship, train. "But" not
  "however", "so" not "therefore", "about" not "approximately". Rupees and lakh/crore first, then one comparison every
  Indian knows. Grounded phrases welcome ("on the ground", "at the end of the day").
- **Banned:** "Welcome to…", "In this video…", "Today we'll…", "Let us understand…", "It has been observed…", moreover,
  furthermore, delve, harnessing, testament to, imperative, in conclusion, thus; foreign slang (y'all, stoked, no cap,
  buckle up, fam); Hindi tags (na, yaar); hype words (§4.1).
- **Section ends move forward** into the next question.
- **Honest drama:** the drama comes from real stakes. Never inflate ("the greatest ever", "nobody believed") unless a
  source says so.

### 7.3 VO text format (for the TTS)
- Numbers and amounts as words ("nineteen oh seven", "two thousand crore rupees"); no digits, `₹`, `!`, double quotes,
  brackets, `&` or semicolons. Units in words.
- **Letter-by-letter acronyms with dots** (U.P.I., R.B.I., O.N.G.C., H.A.L.); acronyms said as a word stay a word (Isro,
  Amul, Nasscom). Names the TTS may misread get a phonetic spelling in the VO text, listed in the film's
  `script/phonetics.md` (Indian names especially: check each one by ear on the first take).
- One beat per line; a blank line between beats in the recording blocks (the engine breathes there).
- No audio tags or emotion cues in the text; the words and punctuation carry the feeling.
- Pace target 140–155 words a minute for storytelling (Creator's measured target for explainers was 145–160; stories
  can breathe a little more). Measure on the real take.

### 7.4 Voice
**To decide with the owner (§17):** which ElevenLabs voice (Creator uses *Akash* for English on Eleven v4, settings
stability 0.65, similarity 0.85, style 0.15, speaker boost on, takes under 1,500 characters), or the owner's own
recorded voice. A real Indian voice builds trust faster (Creator research, 2026-10-21); never synthesise a real person's
voice. Audition with the same opening paragraph and let the owner pick by ear; record the pick here.

### 7.5 Recording blocks in the chat
Whenever a VO is ready or changes, the reply carries **every block as its own fenced code block** (one-tap copy on the
phone), each with a heading line above it: block number, character count, voice and settings, the file name to save
(`vo/<slug>-bNN.mp3`). Nothing but spoken text inside the fence. Files in Drive or the repo are extra, never instead.

### 7.6 Checks before the owner sees a narration
1. Fact gate: every factual line maps to a confirmed `claims.csv` row (§9).
2. Spoken-English check (port `scripts/spoken_english_check.py` from Creator, §15; story films relax its
   "you per 100 words" target: a story speaks to the viewer less often than an explainer).
3. **Independent audience review** (Creator, owner 2026-10-20): a **new cloud session with no repo attached**
   (`create_session` without `source_url`) gets only the title and the narration and plays five Indian viewers (a
   student, a shop owner with English as a second language, a retired teacher, a software engineer, a commuter on a
   noisy bus). It reports: is the story clear in 10 s, where would each swipe away, which lines feel robotic or
   unclear, which moments moved them, top 5 fixes. Apply the fixes that keep every fact true, re-check, save
   `films/<slug>/review/audience_vN.md`, archive the session. *Why:* the writer can't hear the script as a stranger.

## 8. Visual storytelling toolkit

The owner's directive (Part G.1) sets the motion standard; these are our reusable building blocks (build each once in
`lib/remotion/`, parameterised, then reuse with a fresh art direction per film).

### 8.1 Virtual camera
A `<Camera>` wrapper: push-in, pull-out, pan, tilt, isometric tilt, rack-focus (blur fore/background layers), handheld
drift from seeded noise. Every scene sits inside one. Camera moves are springs or eased curves.

### 8.2 Archive photos that move
- **2.5D parallax:** cut the subject from the background (a local segmentation model), fill the gap, then move
  foreground and background at different speeds. Better: a depth map (Depth Anything V2 Small, check licence) displacing
  a subdivided plane in `@remotion/three` for a true camera dolly.
- **Atmosphere** over old photos: dust, smoke, light leaks, period-appropriate grain.
- **Moving contact sheet:** 3–4 angles of the same moment slide into a collage.
- **Colourisation:** only with a visible "COLOURISED" tag, never on evidence-type images.

### 8.3 Documents and newspapers (owner's directive, Part G.1 §3)
Archive clippings, letters, gazette pages and treaties sit on a 3D isometric plane
(`perspective(1000px) rotateX(10deg) rotateY(-5deg)`), with paper texture and soft shadow. An SVG highlighter sweeps
across the quoted words **exactly as the narration reads them**. The highlighted words fill at least a third of the
frame width at the end of the push, so they read on a phone (Creator lesson). Shoot web sources at 2× device scale and
remove pop-ups, cookie bars and ads before the screenshot.

### 8.4 Numbers, money and dates (owner's directive, Part G.1 §2)
- Counters spring up and land exactly on the spoken word. Rupees (₹ glyph: vendor a font subset that has it), crores and
  lakhs in Indian grouping on screen (₹1,25,000), with dollars only when the story is in dollars.
- **Maths is animated, never written** (Creator, owner 2026-10-16): show the thing the number describes, to scale
  (tonnes of steel as a growing stack, rupees as moving coins, a timeline that scrubs). The sum appears at most once,
  small, in a lower-third.
- Timeline jumps: a year counter rolls with a whoosh; the world changes around it.
- **No on-screen number that contradicts the narration**; a label naming a number never stays while a counter rolls past
  it.

### 8.5 Maps and journeys
India map (§6.6), routes drawn as glowing paths (ships, trains, flights), city pins in narration order, satellite
zooms. Pins appear when the city is said.

### 8.6 Reconstructions
When no footage exists of a key moment (a meeting in 1868, a night on a ship), build it: period photos composited with
parallax, silhouettes, 3D sets, or licensed footage of the right place and period. Label it **"RECONSTRUCTION"** or
**"ILLUSTRATION"** wherever a viewer could take it for real footage. Never fake a document, a newspaper or a photo
of a real person.

### 8.7 3D
`@remotion/three` (Three.js) for machines, buildings, rockets, plants, cross-sections: real references first (§11.5), HDRI
lighting (Poly Haven CC0), PBR textures, one post pass (bloom, grain, vignette), AgX tone mapping. Blender Cycles for 2–4
hero shots a film when they earn it (Creator measured 1080p at ~27 s a frame on CPU, 8 samples + denoise: pre-render to
video and composite). Creator's §9 and §15 hold the measured costs and traps (bloom halos, NaN pixels, label pinning,
SwiftShader hash noise): read them before building 3D.

### 8.8 Lower-thirds and chapter cards
Name lower-third: "NAME · role · years". Place/date stamp: "BOMBAY · 1903" in the display serif. Chapter cards are
**in-world** (a stamped date over moving footage, a word engraved on metal), never a black slide.

---

# Part C: Production

## 9. Facts and honesty

### 9.1 What must be true
Every **fact** is verified: names, dates, places, numbers, money, quotes, who did what, what happened, outcomes,
firsts and records. "We do 100% fact check" (owner, 2026-10-24).

### 9.2 What is storytelling (owner, 2026-10-24: "for whole word to word no need to be 100% facts")
The words around the facts can be cinematic: sensory description, scene-setting, the narrator's framing, emotional
language, rhetorical questions. These need no citation. **The line:** storytelling may describe a moment; it may never
change, add or invent a fact. Examples:
- ✅ "The furnace roars. Men in cotton vests feed it coal through the night." (texture over a documented plant)
- ✅ "He must have wondered if he had just lost everything." (framed as the narrator wondering)
- ❌ "He told his son, 'We will build it anyway.'" unless that quote is sourced. Imagined dialogue is never presented
  as a real quote; if used at all, it is framed ("Imagine what he'd have said…").
- ❌ "The whole country celebrated." unless sources show it. Say "crowds gathered at…" with a source.
- **Legends are labelled legends.** Famous origin stories that historians doubt are told as "the story goes…" with the
  doubt said plainly.

### 9.3 The fact-check process (Creator's lighter process, owner 2026-10-11)
1. **The writer logs sources while researching:** `claims.csv` with `id, line, claim, source_url, quote, source_type,
   status`. `confirmed` only when the writer read the primary page (company archive, annual report, government record,
   court record, the newspaper of the day, a peer-reviewed history) or two independent reliable reports. Anything else
   is `unverified`.
2. **The checker** (a fresh subagent at `max` effort) only opens the cited page for strong rows to confirm quote and
   number, and spends real searching on weak rows, every number and date, our calculations and on-screen text.
3. After a script edit, re-check only changed lines. The gate script (port `scripts/claims_check.py`, §15) must pass
   before recording and again before the final render.
4. **Treat any pasted script or brief as a draft.** *Why (Creator):* a script from another AI tool had about 20 wrong
   or unsourced facts out of 40. Keep `brief/changes-from-brief.md` so the owner sees each change and its reason.
5. Contested figures are attributed ("the company says", "the census of 1911 counted"); where sources disagree, say so.

### 9.4 Labels and disclosure
- "RECONSTRUCTION", "ILLUSTRATION", "COLOURISED", "ARCHIVE · year", "ILLUSTRATIVE FOOTAGE" on stand-ins that could pass
  as the real event. Never give stock an archive look.
- YouTube "Altered or synthetic content = Yes" for any realistic synthetic scene of a real event, place or person.
- AI imagery only where nothing real exists, never of a real identifiable person, never as evidence, logged in
  `media_manifest.csv` as AI with the tool used.
- **Finance:** company stories are history and education, never stock tips. No buy/sell calls on listed shares; share
  price charts end at least 30 days before publishing; say "not investment advice" in the description when shares come
  up. (SEBI finfluencer rules; verify the current circular before the first film that shows share prices.)
- Corrections: a `Correction: [timestamp]` line in the description for any error found after upload.

## 10. Remotion engine

### 10.1 Setup and pins
- **Remotion `4.0.534`** (published 2026-10-07; chosen as the newest release at least two weeks old on 2026-10-24).
  Every `remotion` and `@remotion/*` package pinned to exactly that version (`"remotion": "4.0.534"`, no `^`); a
  mismatch makes Remotion refuse to run. Upgrade deliberately, one film at a time, never mid-film.
- **Licence (checked in the package's `LICENSE.md`, 2026-10-24):** free, including commercial use, for individuals,
  for-profit organisations with up to 3 employees, and non-profits. A company licence is needed beyond that
  (remotion.pro). Re-check if the channel becomes a bigger company. Remotion 5.0 will change the licence slightly:
  read it before upgrading.
- Packages to expect: `remotion`, `@remotion/cli`, `@remotion/renderer`, `@remotion/three`, `@remotion/media-utils`,
  `@remotion/fonts`, `@remotion/paths`, `@remotion/noise`, `@remotion/transitions`, `@remotion/captions`; plus
  `three`, `@react-three/fiber` at the versions `@remotion/three` 4.0.534 asks for.
- One Remotion project per film (`films/<slug>/remotion/`), importing shared components from `lib/remotion/`. Node 22
  is installed in the cloud image; FFmpeg comes with Remotion.

### 10.2 Coding standard (owner's directive, Part G.1, made concrete)
- Strongly typed TypeScript React; no `any`. `tsc --noEmit` passes before any render.
- `useCurrentFrame()` and `useVideoConfig()`; motion with `interpolate(frame, [a, b], [x, y], {extrapolateLeft:
  'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...)})` and `spring({frame, fps, config})`.
- **Deterministic:** everything is a function of the frame. `random('seed')` and `@remotion/noise`, never
  `Math.random()`; no `Date.now()`; no network at render time; no state carried from the previous frame.
- `<Sequence from={…} durationInFrames={…}>` per sub-scene, placed on frames computed from the VO word timings
  (never typed by hand). `<Series>` for back-to-back shots.
- Assets with `staticFile()` from the film's `public/`; video with `<OffthreadVideo>` (frame-exact, faster);
  images with `<Img>` (waits for load); audio with `<Audio>`.
- Fonts: vendored `.woff2` files in `public/fonts/`, loaded with `@remotion/fonts`' `loadFont()`; never
  `@remotion/google-fonts` at render time (network).
- Anything async (fonts, JSON, 3D models) is wrapped in `delayRender()` / `continueRender()` so no frame renders early.
- **SFX cues:** every visual event exports a cue `{frame, sfx, gainDb}` into the film's `cues.ts`
  (`whoosh`, `paper_snap`, `thud`, `camera_shutter`, `riser`, `impact`, `tick`, …). The composition plays them with
  `<Audio>` for previews, and the mix (§12) reads the same list, so picture and sound never drift.
- Style: inline style objects with spring maths, or self-contained Tailwind classes; no heavy runtime CSS libraries.
- Brand tokens come from `config/brand.yaml` (generated into a `brand.ts`), never typed by hand in a scene.

### 10.3 The scene handoff document (owner's directive, Part G.1 "Input Format")
Every scene is specified before it is coded, in `films/<slug>/scenes/<scene_id>.md`:
1. `scene_id`, e.g. `S03_TheFurnace`
2. `duration_in_frames` at **60 fps**, from the VO timing (+ any diegetic pause)
3. `audio_timestamps`: the exact frame range of each sentence and of each key word the picture reacts to
4. `visual_direction`: camera move, assets (IDs from `media_manifest.csv`), typography callouts, counters,
   highlights, labels, SFX cues, the semantic-lock line ("at 'one lakh tonnes' the stack lands")
The coding step then returns the complete, executable scene component, with no filler. Scenes are built in
parallel sessions from these docs, so a scene can be rebuilt without retiming.

### 10.4 VO timing
- The film is timed from the **recorded VO and the locked script**, not from transcription. Word-level times come from
  forced alignment of the known script: the ElevenLabs alignment returned with the take when the API is used
  (`with-timestamps` / forced-alignment endpoints, needs an API key, §17), or Creator's `align_script.py` (silence
  detection + script mapping, measured: 75 of 80 line starts within 0.15 s) plus its word spreader. *Why no Whisper
  (Creator):* Whisper dropped stretches, looped and hit limits on Creator's Telugu films; the script is already correct,
  only the timings are needed.
- Output: `vo/timing.json` (sentences and words with start/end in seconds and frames at 60 fps). Every `<Sequence>` is
  computed from it.
- **Pauses are never dead air:** the picture cuts on the breath, music lifts in the gap, and pauses over 1 s become
  ambience or diegetic beats.

### 10.5 Rendering
- Author 1920×1080 at 60 fps; render 4K with `--scale=2` (true 4K for text, SVG and DOM; images and video need 4K-worthy
  sources; WebGL canvases may need their own size handling, test it on the first 3D scene).
- `npx remotion render <comp> out.mp4 --codec=h264 --scale=2 --concurrency=4 --crf=16 --frames=<a>-<b>`, with a
  bitrate cap on the final encode (Creator lesson: uncapped grain made a 3.4 GB 1080p file). 3D scenes: `--gl=angle`
  or `--gl=swangle` (software GL in the container: test which works and record it in §16), concurrency 2–3.
- **Render in shards** of 5–30 s (`--frames`), each written to `tmp_*` and renamed when complete, skipping finished
  shards on restart. *Why (Creator):* worker restarts killed long renders, and a half-written cached shot froze half a
  film with no error. ffprobe every shard after an interrupted run.
- Join shards with `ffmpeg -f concat -c copy` (identical encode settings), then check that the picture length equals
  the film length and video/audio match within 0.15 s before anyone sees it (Creator: a 229 s picture under a 510 s
  voice once reached a delivery copy).
- 60 fps at 4K is about 4× the pixels and 2× the frames of 1080p30: budget with parallel sessions (§3) from the first
  film, and measure the real seconds-per-frame on the first scene; write it in §16.
- Start long renders detached: `setsid nohup npx remotion render … < /dev/null > render.log 2>&1 & disown`; watch the
  log with Monitor.

## 11. Media sourcing

Tested from Creator's cloud sessions (Oct 2026). Sites change: re-test a source when it fails and update this list.

### 11.1 Fallback chains (best first)
- **Indian history and archives:** Wikimedia Commons (via category pages and `Special:FilePath/<name>?width=1920` with a
  descriptive User-Agent; the search API rate-limits: Creator's `commons_html_fetch.py` reads licences from file pages
  and accepts GODL-India) → Internet Archive (books, newspapers, films; check each item's licence) → Library of Congress,
  British Library (public domain items), Europeana, Rijksmuseum → company and government archives (Tata Central
  Archives, Isro, PIB photos: check each one's terms) → a credited short quote of a newspaper page.
- **News and event footage:** Dailymotion API + yt-dlp → archive.org (TV News Archive) → official Instagram/Facebook
  reels via yt-dlp (slow; 429 after bursts) → official sites (Isro, NASA, DD News) → **the owner fetches YouTube on the
  phone** (§11.4).
- **B-roll:** Pixabay API (`PIXABAY_API_KEY`, set; AI-generated results hidden) → Coverr → NASA/ESA (public domain /
  CC) → archive.org Prelinger. Pexels has no new API keys (Oct 2026); the owner can download named Pexels clips on the
  phone into the film's `footage/` folder.
- **Music:** YouTube Audio Library (owner downloads; free for monetised channels) → Pixabay music (the owner downloads;
  only tracks whose page doesn't say "Content ID Registered": on Creator 15 of 21 checked were registered) →
  Incompetech (CC BY) / FreePD (CC0) → ccMixter/FMA without NC.
- **SFX:** Openverse audio (CC0/BY; Freesound previews 403 from the cloud) → Freesound API with a token → synthesised
  UI sounds in the mixer → the clip's own audio.
- **3D and textures:** Poly Haven, ambientCG (CC0), Smithsonian 3D (CC0), NASA 3D, Sketchfab CC BY (download on the
  phone/VPS); TurboSquid "editorial" models are fine in a film, never in a thumbnail, never committed to git.

### 11.2 Blocked or not usable from the cloud
YouTube downloads (intermittent bot check), Vimeo (login), Mixkit/Videvo (403), Pexels/Pixabay websites (API only),
PIB/Prasar Bharati archive and Indian Railways servers (timeouts/resets: ask the owner to open a PDF on the phone),
Overpass/OSM. **Not allowed even if reachable:** anything NC or ND, BBC Sound Effects, AP/Reuters/British Pathé without
a paid licence (ask the owner first, with the cost).

### 11.3 Rules
- **Fact-check before sourcing:** sourcing for a claim that turns out wrong wastes the most time.
- **Contact-sheet every asset before use**, labelled. About a third of search results on Creator were wrong (Kathakali
  for Kalaripayattu, a bomb-blast photo for a festival).
- **Filter licences in code**, then confirm each file's licence on its own page.
- `what_it_shows` in the manifest is literally true ("Tata Steel works, Jamshedpur, 1920s, archive photo", not
  "the 1907 plant").
- **Scrub every owner-fetched clip ±3 s around each in-point at 0.5 s steps** (Creator: a channel wipe and a cut to a car
  show passed a coarser sheet). Crop around burned-in captions and logos per clip; check each crop on a sheet.
- One sourcing session at a time (§3).
- Images: ≥ 1920 px wide wherever possible (4K output); clips: MP4 H.264, trimmed to the best 5–20 s, audio kept only
  for diegetic or live use.

### 11.4 YouTube and official footage via the owner's phone
The cloud is usually bot-blocked by YouTube. **Never route around it** (no VPNs, proxies, alternative clients, other
machines). Creator's `termux_fetch_to_drive.sh` lets the owner fetch exact clips on the phone (mobile IP) straight into
Drive with one pasted line; port it here with the Drive path changed to `Built-on-Bharat/<slug>/footage/` (§15). The
session writes the exact line with URLs and `@MM:SS-MM:SS` ranges. Only short, credited excerpts of official or news
footage the owner has cleared.

### 11.5 Design from real references first
Before drawing any real thing (a locomotive, a blast furnace, a rocket, a hotel facade, a 1930s aircraft, a U.P.I.
screen), collect real reference photos into `films/<slug>/assets/ref/`, contact-sheet them, and write
`design-reference.md` (element → reference → what to copy: shape, colours, livery, labels, layout). *Why (Creator):* a
made-up cab display, non-Indian signals and a wrong track layout were caught by a viewer review.

## 12. Sound

- **The voice leads:** VO peaks −2 to −3 dB. Music −24 to −26 dB under speech, rising to about −12 dB in pauses with 0.5 s
  ramps; silence for 1–1.5 s before a core reveal. Impacts −6 to −8 dB; small SFX (whoosh, paper, shutter) −8 to −10 dB.
- **Cinematic score:** music follows the act shape (wonder → tension → loss → rise → pride). One bed per act, crossfaded,
  never an audible restart. Indian instruments (shehnai, sitar, tabla, bansuri) where they fit the story, never as a
  cliché on every scene.
- **Diegetic moments:** let real sound breathe: a steam whistle, a launch countdown, a crowd, a speech. The VO stops for
  2–6 s; never talk over real dialogue.
- **SFX on every visual event** from `cues.ts` (§10.2).
- **Master:** stereo made explicitly before measuring, −14 LUFS integrated, −1 dBTP, one static gain plus a limiter,
  measured twice, then checked per channel in the final MP4 (`ebur128` + `astats`). *Why (Creator):* linear `loudnorm`
  backed off to −15.9 LUFS, `-ac 2` upmix lost 3 dB, and an AAC re-encode overshot a channel.

## 13. Render, deliver, YouTube package

### 13.1 Delivery
Upload the 4K master and a 1080p copy to `Built-on-Bharat/<slug>/` with `scripts/upload_gdrive.sh --sub <slug>`;
send the thumbnails, contact sheet and `youtube/description.md` with `SendUserFile`; report in plain words.

### 13.2 YouTube package (every final film)
1. **Thumbnail built for curiosity** (Creator, owner 2026-10-22: "we are failing at thumbnail, that's why low CTR").
   The test: *a viewer who sees it for one second on a phone feels a question only the film answers.*
   - One real thing, big (a face, a machine, an object, a moment), recognisable in under a second.
   - A visual question: something surprising, out of scale or out of place.
   - 2–4 words (max 5) that add to the title and **never answer it**; no full sentences.
   - Bright or high contrast: YouTube's app is dark, so a dark card sinks. Our charcoal-and-bronze world works only with
     a strongly lit subject and one bright accent word.
   - Nothing important in the bottom-right corner (the duration badge). Check at 168×94 px.
   - Honest: everything in it is paid off in the film, ideally in the first 30 s.
   - Never AI images of real people; never fake a face. The owner's own photos, if he sends them, go opposite the text.
   - Build 3+ concepts as HTML, shoot them with Playwright at 1280×720 JPG, run a phone-feed test (port
     `scripts/thumb_feed.py`, §15) and an independent click panel (a no-repo session), then deliver a main and an A/B
     challenger for YouTube's Test & Compare. Record the winner and its CTR here after two weeks.
2. **Title** in a click-to-copy code block (≤ 100 characters, no `!`), the hook and the words people search first;
   one or two alternatives in their own blocks. The channel-name suffix is an open decision (§17).
3. **Description** in its own click-to-copy block: **only** 2–4 plain lines on what the film shows, then chapter
   timestamps from `0:00` (at least 3, each ≥ 10 s apart), taken from the exact file the owner uploads. No sources,
   credits, hashtags or links in the block (Creator's owner rule, 2026-10-17; confirm for this channel, §17).
4. Save as `films/<slug>/youtube/description.md` next to the thumbnails; paste the title and description blocks in
   the final chat reply as well.
5. **Shorts:** 2–3 vertical cuts (30–50 s) from the strongest scenes, each standing alone and pointing to the film.
6. **Close-out:** commit, push the session branch, open a PR to `main`, merge it, tell the owner which branch to delete,
   archive the session.

## 14. Review gates

Nothing reaches the owner without passing all of these (and §1's "polished only").

### 14.1 Script gate
- [ ] `claims.csv` complete, gate script passes; every changed line re-checked.
- [ ] Cold open in motion, promise by 0:25, open loop by 0:55, no banned openers, channel name only in the outro.
- [ ] A named human in every chapter; reaction beats after big turns; respect rules (§4.1) met.
- [ ] Storytelling never invents a fact, quote or outcome; legends labelled.
- [ ] Spoken-English check and independent audience review done (§7.6).

### 14.2 Picture gate (every cut)
- **Audio-synced frame review:** one frame per second with the words heard in that second; read **every** sheet; fix
  every frame that doesn't show what is said, is empty, unreadable, covered or off-frame. Then a whole-film pass.
- **Independent viewer review** (Creator, owner 2026-10-16): a new cloud session without the repo gets only the cut (a
  Drive download link) and the narration with timecodes, and gives a blunt verdict, a per-scene score table and the top
  10 fixes. Check its claims against sources and rules before changing anything. *Why:* on Creator it caught a broken
  semantic lock, a dead end card, map pins out of order, two different numbers on screen at once and 85 s of bare grid
  that three self-reviews missed.
- [ ] ≥ 85% moving; no frame still for over 1.5 s; a visual change about every 3.5 s.
- [ ] Every shot matches the words over it; every number on screen matches the narration.
- [ ] Labels on reconstructions, illustrations, colourised and stand-in footage; credits on archive footage.
- [ ] No stock clip more than twice; Indian faces, places and money in every stand-in.
- [ ] Text readable on a phone; nothing important under YouTube's overlays; logo bug clear of scenes.
- [ ] India maps official; no AI garbled text anywhere.
- [ ] No black or dead frames; music never restarts audibly; −14 LUFS, −1 dBTP checked in the final file.
- [ ] Stream check: picture = film length; audio/video within 0.15 s.

## 15. Tools to bring from Creator

Copy a tool from `mkmk749278/Creator` when a film first needs it, adapt it (paths, Drive folder, channel rules), and
note it here. Already ported:
- `scripts/upload_gdrive.sh` (2026-10-24): default folder is now `Built-on-Bharat`.

To port when needed (Creator path → what to change):
- `scripts/gdrive_pull.sh` → read from `Built-on-Bharat/<slug>/…`.
- `scripts/termux_fetch_to_drive.sh` → rclone remote rooted at `Built-on-Bharat`, raw URL to this repo.
- `scripts/contact_sheet.py` → as is.
- `scripts/align_script.py` (+ the word spreader in `projects/minimum-due/build/words.py`) → output frames at 60 fps.
- `scripts/spoken_english_check.py` → relax the "you"/question targets for story narration; keep banned words.
- `scripts/claims_check.py` → as is.
- `scripts/thumb_feed.py`, `scripts/_thumb_shot.mjs` → as is.
- `scripts/stock_fetch.py`, `scripts/commons_html_fetch.py`, `scripts/openverse_fetch.py`, `scripts/fetch_media.py` →
  as is.
- `scripts/mix_master.py` / `final_mix.sh` → read `cues.ts` SFX cues; keep the loudness fixes (§12).
- `prompts/audience_review_v1.md` → rewrite for story films (emotion, clarity of the story, where they'd swipe).
- `.claude/skills/` (fact-check, source-media, review-cut, deliver, parallel-render) → rewrite for this channel and
  Remotion as they are first used.

---

# Part D

## 16. Lessons log
*(Newest first. Each lesson: what happened, the rule, why.)*

**Channel setup (2026-10-24).** Repo started; CLAUDE.md and this playbook written from the owner's directive (Part G)
and Creator's lessons. Drive folder `Built-on-Bharat` and `_Channel/` created; logo and banner originals uploaded there.
The two brand images are 2048×2048 and 2752×1536 PNGs (about 8 and 7 MB); git holds 1024/1920 px JPG reference copies
only. Both carry the generator's sparkle mark bottom-right (clean before use, §6.5).

## 17. Decisions and open questions

**Decided (owner, 2026-10-24):** new channel Built on Bharat; Remotion stack; 60 fps; the motion directive in Part G.1;
cinematic storytelling with fully checked facts; Indian emotion, humanity and respect first; polished deliveries only;
Drive folder `Built-on-Bharat`.

**Defaults chosen, to confirm with the owner:**
1. **Narration language:** English (pan-India), Hindi/Telugu audio tracks later. *Default because:* the tagline and
   banner are English and English reaches every state.
2. **Length:** topic decides, about 10–16 min as a guide.
3. **4K at 60 fps** rendered with `--scale=2` from 1080p authoring.
4. **Title format:** no channel suffix (Creator's breakout title had none and the suffix ate the phone title).
5. **Description:** Creator's short format (2–4 lines + chapters, no sources or links).
6. **Sign-off line:** none fixed yet (Creator's "Jai Hind" sign-off belongs to that channel).

**Open, need the owner:**
- Voice: an ElevenLabs voice (which one?) or the owner's own recordings? An ElevenLabs API key in the environment
  (`ELEVENLABS_API_KEY`) would give exact word timings with each take.
- A clean vector / transparent version of the medallion for the logo bug and the outro sting.
- First film topic (candidates in §4.3).
- Upload schedule and whether Shorts start from film 1.

---

# Part G: the owner's directives, verbatim

## G.1 Motion directive (file `Claude.md`, received 2026-10-24)

> # Role: Senior Remotion Motion Graphics Architect & Visual Director
> # Channel: Built on Bharat (@BuiltOnBharat)
> # Stack: Remotion (React, TypeScript, TailwindCSS/CSS Modules, Spring Animations)
>
> ## Objective:
> You take a structured Scene Handoff Document (containing narration text, word-level audio timestamps, and visual
> asset manifests) and generate production-ready, highly polished Remotion scene components.
>
> Your output must be cinematic, dynamic, and editorial—matching the visual caliber of channels like "Built On You" and
> "ColdFusion". Viewers must never feel bored; the visual pacing must feel responsive, rhythmic, and physically grounded.
>
> ---
>
> ## Visual & Motion Guidelines:
>
> ### 1. Motion Continuity (The 3.5-Second Rule)
> - NEVER render a static container or image. Every frame must have continuous micro-movement.
> - Use Remotion's `interpolate()` and `spring()` for all motion curves. Avoid linear transitions.
> - Camera moves must be smooth: slow push-ins (`scale: 1.0 -> 1.06`), subtle camera pans (`translateX`), or isometric
>   tilts.
>
> ### 2. Kinetic Typography & Data Displays
> - When key statistics, currencies (₹, $), or dates appear in the VO, render them using animated number counters that
>   spring up exactly at the timestamp mark.
> - Use large, bold, editorial typography with letter-spacing. Use the theme colors:
>   - Background: Deep Matte Charcoal (`#121212` or `#0D0E11`)
>   - Accent Gold/Bronze: `#C57D3C` or `#D4AF37`
>   - Text Primary: `#FFFFFF`
>   - Text Secondary / Blueprint Muted: `#8E929B`
>
> ### 3. Document Highlighting & Archival Paper Treatment
> - Display archival clippings, letters, and treaties on a 3D isometric plane (`transform: perspective(1000px)
>   rotateX(10deg) rotateY(-5deg)`).
> - Animate an SVG highlighter line across the quoted text precisely as the narration reads those words.
>
> ### 4. Audio-Visual Synchronization
> - Every major visual event (a document slam, an archival photo cut, a stat counter finish, a timeline jump) must
>   expose a callback or reference to trigger an SFX (`whoosh.mp3`, `paper_snap.mp3`, `thud.mp3`,
>   `camera_shutter.mp3`).
>
> ---
>
> ## Coding Standards:
> - Write 100% clean, strongly typed TypeScript React components for Remotion.
> - Use `useCurrentFrame()` and `useVideoConfig()` properly.
> - Wrap discrete sub-scenes in `<Sequence>` blocks based precisely on the provided millisecond timestamps.
> - Ensure assets are dynamically imported or referenced from the `assets/` directory using Remotion's `staticFile()`
>   helper.
> - Avoid external CSS libraries that require heavy runtime setups; write self-contained Tailwind classes or clean
>   inline style objects with Remotion spring math.
>
> ---
>
> ## Input Format You Will Receive:
> 1. `scene_id`: Identifier (e.g., `Scene01_Hook`)
> 2. `duration_in_frames`: Calculated based on audio length at 60 FPS.
> 3. `audio_timestamps`: Exact frame ranges for each sentence/word.
> 4. `visual_direction`: Required camera movement, asset references, and typography callouts.
>
> When I provide a Scene Handoff Document, return ONLY the complete, executable Remotion TypeScript component file
> without filler explanations.

*Note:* Remotion's `staticFile()` reads from the project's `public/` folder, so "the `assets/` directory" means
`public/assets/` inside each film's Remotion project.

## G.2 Owner's message (2026-10-24)

> This Built-on-Bharat is our new channel. For reference only I'm attaching creator repo. Attaching document actually how
> you need to create videos. Indians emotions, Indians reaction, Indian humanity and their respect and respect towards
> india is more important. We do 100% fact check but for whole word to word no need to be 100% facts. We do narrate
> like movie, cinematic level of story telling, visuals, motion graphics and camera moments are matter. Don't ever limit
> your self as opus 5.5 you can do lot. And don't ever give the test file and for production even to show me as sample
> that should be polished one only. With all this first create Claude md and Playbook md files and use Google drive and
> create new folder Built-on-Bharat on Google drive and ask any clarification needed.

*(Lightly punctuated for reading; words unchanged.)*
