# Built on Bharat: production playbook

The one reference doc for this repo. `CLAUDE.md` holds the short rules every session must follow; this file holds
everything else: full specs, how-tos, measurements and the reason behind each rule, so a future session can tell when a
rule applies and when it doesn't. Add new lessons here (with the reason), never in new doc files.

Many lessons come from the sister channel's repo, `mkmk749278/Creator` (*Be Practical with Kishore*, Oct 2026). Where a
rule came from there, it says so, with the measured reason. Its files are a reference only.

**Contents**
- Part A: How we work. 1 Owner and delivery · 2 Claude: creative director, and effort · 3 Parallel sessions
- Part B: The channel. 4 Identity, audience, emotion and respect · 5 Story architecture · 6 The look ·
  7 Narration (the most important thing) · 8 Visual storytelling toolkit
- Part C: Production. 9 Facts and honesty · 10 Remotion engine · 11 Media sourcing · 12 Sound ·
  13 Discovery and packaging (YouTube algorithm analysis) · 14 Review gates · 15 Tools to bring from Creator
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

## 2. Claude: creative director, and effort

### 2.1 Creative director (owner, 2026-10-24)
> "Always should be creative director for everything … rules not the ceiling, they are for reference … creative
> brains don't have limits." (owner, 2026-10-24)

Claude owns the creative vision of every film from topic to thumbnail. A director decides; a template follower
repeats. *Why:* YouTube judges each video on its own and rewards what viewers are glad they watched (§13.1); a channel
that looks like everyone else's, or like its own last film, gives them no reason to choose it.

**How the rules work here.**
- **Craft rules are a floor and a reference.** Pacing numbers, structure, chapter lengths, looks, formats: they record
  what worked and what failed, with the reason. Know the reason; when a better idea serves the viewer more, break the
  rule on purpose, write why in `treatment.md`, check it in review, and log the result in §16.
- **Hard lines never bend:** every fact verified (§9), honesty labels (§9.4), licences and rights (§11), respect for
  India and its people (§4.1), no fakes of real people, polished-only deliveries (§1), and the owner's decisions (§17).

**The creative treatment** (`films/<slug>/treatment.md`, written after research, before the script, then shared with
the owner as a finished one-page pitch):
1. **Logline:** the film in one sentence with its tension ("A Parsi trader bets his fortune on a steel plant in a
   jungle, while the empire that rules India says Indians can't make steel." Shape only; facts verified first).
2. **The feeling:** what the viewer should feel at the start, the darkest moment and the end.
3. **The angle:** why our film is different from every other film on this subject (3 angles considered, 1 chosen).
4. **The visual world:** the film's own art direction inside the brand (§6.1): texture, light, colour temperature,
   motif, the camera's personality.
5. **Signature moments (2–3):** the shots people will remember and share: an impossible camera move, a match cut across
   a century, a 3D cutaway that finally makes the mechanism click, a silence. Each gets a short design note.
6. **Sound palette:** the instruments, the textures, where the music stops.
7. **The package:** title, thumbnail concepts and search phrases (§13.2), written first, because they are the promise.

**Creative habits.**
- **Kill the first idea.** It's usually the one every other channel had. Write three, keep the one that surprises you.
- **Steal from cinema, not from YouTube templates:** match cuts, sound bridges, a slow push into a face, a held wide
  shot, a cut to black on the reveal, a shot that holds while the music drops out.
- **Every chapter earns one "how did they do that?" moment.** Not more effects: one idea that lands.
- **Surprise inside the brand:** the medallion world (bronze, charcoal, sparks) is the home; each film visits a new
  room in it.
- **Benchmark against the best:** before locking a treatment, look at the 3 strongest films on the subject (any
  language) and write what ours does better. Competitors are a reference, never a ceiling.
- **Smart, not just bold:** each creative choice must make the story clearer, the emotion stronger or the curiosity
  sharper. If it only looks clever, cut it.

**Asking the owner.** The owner answers by selecting options on the phone. When a decision is his (voice, topic,
anything paid, a change to his rules), ask with the AskUserQuestion tool: 2–4 clear options, the recommended one first
marked "(Recommended)", each with a one-line reason. Decide everything else yourself and say what you decided.

### 2.2 Effort

- **Don't limit yourself (owner, 2026-10-24: "don't ever limit
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

### 4.1 The owner's priorities (2026-10-24)
Two things come before everything else: **the narration** (§7: immersive, never a teacher, a news reader or flat)
and **curiosity in the package** (§13: thumbnail, title and description that make a stranger need the film, and
match how people search). Then these three:
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
`films/<slug>/brief.md` (topic, angle, why now, demand check, package draft) → `research/` (sources, timeline,
people, `search_terms.md`) → `treatment.md` (the creative director's pitch, §2.1) → `story.md` (protagonists, want, obstacles, turns, emotional beats, the chapter map) → `script/` (narration + screenplay)
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

## 7. Narration: the most important thing (owner, 2026-10-24)

> "Narration is the most important thing. Not like teacher, not like news reader, not like flat. We should hold
> audience, they should get immersive experience, they should lean into story." (owner, 2026-10-24)

*Why it decides everything:* YouTube's recommendations follow how viewers respond to each video: how long they watch,
whether they're satisfied, whether they come back (§13.1). On the sister channel, about two thirds of the viewers who
left were gone in the first 45 seconds, and the rest mostly stayed to the end. The picture keeps the eyes; **the
narration keeps the person**. A synthetic voice makes flat writing sound even flatter, so the writing has to carry the
life.

### 7.1 The three voices we never use
The same facts in each voice, so the difference is clear. *(Chandrayaan-3 is used only to teach the craft. Its facts
are well known, but a real film still puts every line through §9.)*

**The teacher** explains before the viewer cares: definitions first, an agenda, "X is a Y".
> ❌ "Chandrayaan-3 was India's third lunar mission. Its objective was to demonstrate a safe soft landing on the Moon.
> To understand its importance, let us first look at what a soft landing is."

**The news reader** summarises the ending first and lets big adjectives do the work. Passive, no person, no moment.
> ❌ "In a historic achievement, India became the first nation to land near the lunar south pole, a milestone that was
> celebrated across the country."

**The flat voice** has every sentence the same length and weight. No questions, no turns, no silence.
> ❌ "The lander began its descent in the evening. The engines slowed it down. The team watched the data. The lander
> touched down safely. The country celebrated the landing."

**The storyteller** puts you inside the moment, withholds the ending, and makes you need the next line.
> ✅ "Evening, twenty third of August, twenty twenty three. A control room in Bengaluru... and nobody is touching
> anything. They can't. The lander is falling towards the Moon on its own, and for these last minutes, no human can
> help it. Four years ago, India tried this exact thing — and lost the lander in the final minutes. Same room. A lot
> of the same faces. And now the whole country is watching... one small dot on a screen."

*Why the last one works:* a time, a place and a moment; a tension you can feel ("nobody is touching anything"); the
stakes in human terms (the last attempt failed, the same faces); a question the viewer now holds (will it land?);
long lines against short ones; `...` and `—` giving the voice room to breathe and turn.

### 7.2 What makes a viewer lean in (the craft)
1. **Start in the middle of the moment.** The first line is inside a scene that is already moving, never before it.
2. **Specific beats general.** One time, one place, one person, one object ("one small dot on a screen"), never
   "scientists worked hard for many years".
3. **Chain with "but" and "so", never "and then".** Every beat is caused by the last one or works against it. A run of
   "and then… and then…" is a list, and a list loses people. (Writers' rule of thumb, popularised by Trey Parker and
   Matt Stone.)
4. **Curiosity loops at three sizes.** One **film loop** (opened by 0:55, paid at the end). One **chapter loop** per
   chapter (a question opened at the start, answered 2–4 minutes later). **Small loops every 20–40 seconds** (a
   withheld detail, "but there was a problem nobody had noticed yet"). Close one loop and open the next in the same
   breath. Never open a loop the film doesn't close, or the viewer feels cheated.
5. **Give half, keep half.** Curiosity is strongest when people know enough to see the gap (Loewenstein 1994,
   *Psychological Bulletin* 116: 75–98, "information gap" theory). So give the reference point first ("India had
   already failed once, in the last two minutes"), then the gap ("what changed in four years?").
6. **Stakes in human terms.** Who loses what if this fails: a family's savings, a town's jobs, a scientist's career,
   the country's pride. Rupees and what they meant then ("a year's salary for a mill worker").
7. **Put the viewer inside.** Present tense for scenes; "you" placed in the scene ("Stand on that platform. The
   heat comes off the rails in waves."); one or two senses per scene, never a pile of adjectives. People who feel
   carried into a story are more moved by it and believe it more (Green & Brock 2000, *Journal of Personality and
   Social Psychology* 79: 701–721, "narrative transportation").
8. **One point of view per chapter.** Tell it through someone's eyes, with what they knew then, not what we know now.
   When we know more than they did, say so ("He didn't know it yet, but…"): it pulls the viewer forward.
9. **Turns.** Every chapter has an expectation and a reversal. If nothing surprises the viewer for two minutes, the
   chapter is too long or in the wrong order.
10. **Show the emotion, don't name it.** Never "it was an emotional moment". Show the hands that won't stay still, the
    silence before the cheer, the scientist who takes his glasses off. Real reactions only (§4.1).
11. **Rhythm and breath.** A long, flowing line, then a short punch. The key line on its own. A pause before the
    reveal; sometimes the music stops and the voice says nothing at all.
12. **Talk like a person.** Contractions, plain words, the odd aside ("and this is the part I love"), "I" used
    rarely and only when it sounds real. Ask the viewer's own question out loud, then answer it.
13. **Plant and pay off.** Plant an object, a line or a person early; bring it back at the end with new meaning.
14. **End on an image and a feeling,** never a summary. Then one forward line into the next film.
15. **Leave room for the picture.** Never describe what is already on screen ("here we see a steel plant"). The words
    add what the picture can't: the stakes, the thought, the number, the irony. Let real sound carry 2–6 seconds with
    no voice at big moments.

### 7.3 Words, rhythm and the banned list
- **Simple words** an Indian from any state knows: build, money, buy, sell, work, factory, ship, train. "But" not
  "however", "so" not "therefore", "about" not "approximately". Rupees and lakh/crore first, then one comparison every
  Indian knows. Grounded phrases are welcome ("on the ground", "at the end of the day").
- **The breath test:** each sentence fits one natural breath, so nothing over about 25 words. Never three sentences of
  the same length in a row, and never three or more very short ones in a row. `...` before a number or a reveal, `—`
  for a turn, `?` on every real question. *Why (Creator, measured):* the TTS voice takes pitch and breath only from
  punctuation and sentence variety, so uniform report-like sentences drone.
- **Sensory texture is allowed** (the heat, the noise, the coal smoke): it is how a film feels. It never adds a fact
  (§9.2).
- **Honest drama:** the drama comes from real stakes. Never inflate ("the greatest ever", "nobody believed") unless a
  source says so.
- **Banned:** "Welcome to…", "In this video…", "Today we'll…", "Let us understand…", "It has been observed…", "In a
  historic achievement…", "a milestone", "it is worth noting", moreover, furthermore, delve, harnessing, testament
  to, imperative, in conclusion, thus; foreign slang (y'all, stoked, no cap, buckle up, fam); Hindi tags (na, yaar);
  hype words (§4.1).

### 7.4 The lean-in test (every paragraph, before recording)
Write the script as `script/screenplay.md` with a **Q column**: the question the viewer is holding during that
paragraph. Then check each paragraph:
- [ ] **What is the viewer waiting to find out right now?** If the Q cell is empty, they swipe: add a question or cut.
- [ ] Is there a person, a place and a moment, or is it a summary?
- [ ] Is there a "but" or a "so" in it, or is it "and then"?
- [ ] Read it aloud. Would a teacher, a news reader or a flat voice say it this way? Then rewrite it.
- [ ] Can it go without the film losing anything? Then it goes.
- [ ] Does the last line pull into the next paragraph?

### 7.5 Writing for Eleven v4 and Akash: text that performs (owner, 2026-10-24)
> "Fully understand ElevenLabs, the v4 model, Akash English confident and natural voice; optimise our text for that,
> to take breaths, long sentence reading, where to speak louder, where to speak low, depth in bass, to get a more
> realistic voice." (owner, 2026-10-24)

**What the model does (ElevenLabs' own docs and launch post, read 2026-10-24; sources below).**
- Eleven v4 is a new architecture that "can interpret the intended tone, how the speech should be paced, the character
  of the writing, and context from the text". **So the words and their order are the first direction**: a well-written
  scene performs itself; a report-like paragraph drones (Creator's measured lesson, §7.3).
- **Audio tags in square brackets** steer delivery, and v4 "follows audio tags and direction prompts more accurately than
  prior models". Tags are free-form plain English: a named emotion (`[curious]`, `[sad]`), a delivery (`[whispers]`,
  `[slowly]`, `[rushed]`), a reaction (`[sighs]`, `[exhales]`), a pause (`[pause]`, `[long pause]`) or a description
  of the voice (`[low, steady voice]`, `[low, gravelly voice]`). A tag works best **right before the words it changes**;
  two can be stacked (`[pause] [softly]`). "Tags land more readily when the delivery is already in the voice's training
  data": a confident, natural narrator like Akash takes narrator directions (low, warm, serious, curious, quiet pride)
  far better than acting ones (crying, shouting).
- **Punctuation:** ellipses "add pauses and weight"; "capitalization increases emphasis"; dashes give short, less
  predictable pauses; standard punctuation sets the rhythm. **No SSML break tags** in v3/v4.
- **Pronunciation:** v4 has improved IPA support between slashes ((for example a name written in IPA)); use it only for a name the first
  take gets wrong, and check it by ear.
- **Settings:** lower stability = more expressive and more variation between takes; higher = steadier and more
  uniform. v4 guides report no style or speed sliders in v4 (if the app still shows them, leave style at 0 and speed at
  1.0). Generate **2–3 takes** of a block and keep the best; tags are guidance, not guarantees.

**Owner's test, 2026-10-24: describing the voice changes the voice.** "`[low, steady voice]` — it's not coming out
good. Too low and totally different." With a library voice like Akash, a tag that *describes a voice* (`[low, steady
voice]`, `[warmer, conversational]`, `[warm, confident]`) makes v4 build a different voice, not direct Akash's. **So:
never describe the voice in a tag.** Use only short emotion and pause words that leave the voice alone.

**How we write for it (the performance layer).** The fact-checked `vo.txt` stays tag-free. A second file,
`vo_performance.txt`, adds direction from `performance_map.tsv`, and a script checks that the spoken words are
identical.
1. **No tags at all (owner, 2026-10-25).** Not voice descriptions (they changed the voice), not emotion tags (the
   feeling shifted and sounded synthetic), not `...` (no gap), and not pause tags either ("not coming good, use commas
   and dots, that's only fine"). The recording text is the fact-checked `vo.txt`; `build_performance.py` now copies it.
2. **Breath:** a blank line between beats (the engine resets there); one beat = one breath (§7.3, ≤ 25 words); long
   flowing sentences are fine when commas sit where a person would breathe.
3. **Low and high come only from the writing:** short, quiet sentences read low; questions lift; a run of short beats
   builds energy; a concrete image (a name, a number, an object) slows Akash down by itself. If a line comes out with
   the wrong feeling, rewrite the line, never tag it.
4. **Stress:** CAPITALS on one word at most in a beat, and only where a person would hit it ("ANY rich list", "HER
   diamond"); 3–6 in a whole film.
5. **Silence comes from punctuation:** a full stop for a beat, a comma for a breath, a new paragraph for a longer stop,
   a one-word sentence for a hard stop ("No."). **Never `...` for a pause:** measured with `vo_review.py` on the first full
   recording (11 takes), Akash gave 0.00–0.16 s at every mid-sentence `...` (9 of 9), against 0.6–1.0 s at `[pause]`.
   The music edit does the rest (§12).
6. **Long pauses belong to the edit,** not the read: the picture and music hold a breath where the story needs one (§12).
7. **Depth and bass** come from the voice, never from a tag. In the mix: a gentle low shelf (+1.5 to +2.5 dB around
   120 Hz), a high-pass at 70 Hz to remove rumble, a de-esser around 6–8 kHz, light compression (2:1 to 3:1) and room
   tone so the voice sits in a space. Never pitch-shift a voice.
8. **Text rules still apply:** numbers and amounts as words, no digits, `₹`, `!`, double quotes or semicolons;
   letter-by-letter acronyms with dots (U.P.I., R.B.I., T.C.S.), word acronyms as words (Isro); names the first take
   gets wrong get a phonetic spelling or IPA in `script/phonetics.md`.

**The test pack (before the full recording).** Block 1 is recorded at stability 0.50, 2 takes; `vo_review.py` checks
that every pause tag gave a pause and that no tag was read aloud; the owner listens. *History:* v1 voice-description
tags changed the voice; v2 emotion tags made the feeling shift and sound synthetic; v3 (pause tags only) is the rule.

Sources: ElevenLabs TTS best practices (https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices),
Eleven v4 launch (https://elevenlabs.io/blog/eleven-v4), Eleven v3 prompting (https://elevenlabs.io/docs/best-practices/prompting/eleven-v3),
Morphic's v4 guide (https://morphic.com/resources/how-to/eleven-v4-guide, third-party: 3,000 characters per request,
tag placement, no style/speed sliders), and Creator's measured Akash lessons (pitch drop on uniform sentences,
acronyms, ~10% faster than estimates).

### 7.6 Voice and performance
**Akash for now (owner, 2026-10-24),** on Eleven v4; a thorough voice-library search comes later (§17). Settings for
the tagged read: **stability 0.50** (more life than Creator's 0.65, which suits an explainer), similarity 0.80, speed
1.0, speaker boost on; style 0 if the app shows it. Confirm with the test pack (§7.5). When the search happens, audition
on the same storyteller paragraph for warmth, depth (chest resonance in the low register), range (can it go soft and
lift) and whether it varies pace on its own. A real Indian voice builds trust faster (Creator research, 2026-10-21);
never synthesise a real person's voice. Generate in short blocks; regenerate any line that comes out flat, and keep the
best take of each block.

### 7.7 Recording blocks in the chat
Whenever a VO is ready or changes, the reply carries **every block as its own fenced code block** (one-tap copy on the
phone), each with a heading line above it: block number, character count, voice and settings, the file name to save
(`vo/<slug>-bNN.mp3`). Nothing but spoken text inside the fence. Files in Drive or the repo are extra, never instead.

### 7.8 Checks before the owner sees a narration
1. Fact gate: every factual line maps to a confirmed `claims.csv` row (§9).
2. The lean-in test (§7.4) on every paragraph, and the Q column filled.
3. Spoken-English check (port `scripts/spoken_english_check.py` from Creator, §15; story films relax its
   "you per 100 words" target, because a story speaks to the viewer less often than an explainer; banned words stay).
4. **Independent audience review** (Creator, owner 2026-10-20): a **new cloud session with no repo attached**
   (`create_session` without `source_url`) gets only the title, the thumbnail text and the narration, and plays five
   Indian viewers (a student, a shop owner with English as a second language, a retired teacher, a software engineer,
   a commuter on a noisy bus). It reports:
   - a **lean-in map**: every ~30 s marked *leaning in*, *neutral* or *drifting*, and where each viewer would swipe;
   - any line that sounds like a teacher, a news reader or a flat voice;
   - whether the first 30 seconds deliver what the title and thumbnail promised;
   - which moments moved them, and what question is still in their head at the end;
   - the top 5 fixes, with rewritten lines.

   Apply the fixes that keep every fact true, re-check, save `films/<slug>/review/audience_vN.md`, archive the session.
   If any viewer drifts in the first minute, fix and review again. *Why:* the writer can't hear the script as a
   stranger.

### 7.9 Reviewing the recorded takes (owner, 2026-10-24)
Claude can't hear audio, and no connector listens to it (the ElevenLabs connector only manages voice agents). So every
take is **measured** with `scripts/vo_review.py` before it goes into the edit, and before Claude says a word about it.
- **Speech-to-text, for checking only (owner chose "local open model", 2026-10-24):** faster-whisper `small.en` runs on
  the session's CPU, offline, free. It is used **only to check our own VO against its locked script**: never for timing
  (§10.4 stays forced alignment), never for captions, never on anyone else's footage. Nothing leaves the session.
- **Run:** `scripts/vo_review.py TAKES*.mp3 --blocks films/<slug>/script/blocks_performance.md --out DIR` (about 45 s
  of CPU per minute of audio; transcripts are cached in `DIR/<take>/words.json`). Each take is matched to its block on
  its own, so the owner never has to name files. Venv: `av==14.2.0 faster-whisper==1.1.1 librosa==0.10.2.post1
  soundfile==0.12.1 matplotlib==3.9.2`.
- **What it reports** (per take `report.md` + `review.png`, and `summary.md` in block order):
  - **Words as written:** dropped, added or changed words against the script, with times. Spelling variants (disc/disk,
    H-A-L/HAL, can't/cant) and numbers split by the transcriber are normalised away. Added words that match our tag
    vocabulary are flagged **TAG READ ALOUD?** Speech-to-text still mishears names now and then: listen before re-recording.
  - **Pace** over speech time (target 145–160 wpm) and every pause over 0.25 s.
  - **Pause cues kept:** for each `[pause]`, `[long pause]` and `...`, the silence measured just before the next word.
  - **Pitch:** median, and the range per 6 s window in semitones (under 3 = a flat stretch).
  - **Voice drift:** median pitch shift and MFCC timbre distance against the batch (or `--ref` takes). Over 1.5 semitones
    or 0.02 for the whole take = **VOICE CHANGED** (the `[low, steady voice]` problem); 3 s windows over 0.05 are listed
    to listen to. Measured on a real Akash take: the same voice sits at 0.003, a take shifted 3 semitones at 0.056.
  - **Loudness:** integrated LUFS and true peak (the mix normalises later; a peak over −1 dBTP is flagged).
- **Then:** keep the best take of each block, list the lines to regenerate with the reason (a word wrong, a tag read
  aloud, a missed pause, a voice change, a flat stretch), and tell the owner in plain words. The owner sends takes
  straight in the Claude app, or saves them in Drive `Built-on-Bharat/<slug>/vo/`.

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

### 8.9 INK figures: drawn people for the moments no camera caught (2026-10-24)
*Why:* Creator's owner approved hand-drawn acting characters on 2026-10-24 (Creator PLAYBOOK §4a-3 item 3, after its
stick-man demo `video/stickman/`), and our first priority is Indian humanity (§4.1). History rarely photographed the
ordinary people who made it happen: the 8,000 investors, the steelworkers at the pay window, the family on a scooter.
Drawn figures let us show them, honestly, as drawings.
- **Our look, not Creator's:** bronze-ink line figures on charcoal blueprint paper, with a 12 fps line boil, a soft
  ember rim light where they are lit, Indian clothing and props for the era (dhoti, turban, nine-yard saree, Parsi
  *pheta*, mill cap, steelworker's vest and tongs). Each film designs its own cast inside this look.
- **Who they can be:** only anonymous, everyday Indians (the crowd, workers, a family, "you" the viewer). **Never a
  real, named person** (founders and officials appear only in real photographs) and never a caricature. A figure never
  stands in for footage or a photo that exists.
- **What they do:** act out the viewer's situation, the crowd's feeling, a hypothetical, or a mechanism with a human in
  it. They can walk *into* real archive photos (composited), so drawing and history meet.
- **Craft bar (from Creator's rig):** planted feet, 2-bone IK for arms and legs, anticipation and follow-through, eyes
  and head that look at what matters, a face that changes with every beat, secondary motion (dupatta, scarf) from
  velocity, a soft contact shadow, a sound on every action; the figure fills ≥ 40% of frame height in close shots.
- **Tone (from the owner's render of Creator's demo, `stickman_paper_plane_v2.mp4`, reviewed 2026-10-24):** its acting is
  the bar (a face that changes every beat, the idea bulb, the "!", anticipation before the throw, motion-trail arcs,
  planted feet). Its look (cream paper, red scarf, big cartoon grin, ukulele) is a comedy look: we keep the acting and
  change the costume. In emotional beats (the pay window, the investor queue, the hospital) figures are dignified:
  smaller eyes, held poses, no grins. Comic acting only for light beats (Upcott's "indigestion", the licence-raj file
  wall, the Ford table flipping).
- **How:** a Remotion port of Creator's rig (`video/stickman/stick.js`: walk, IK, face, look-at, all pure functions of
  time) into `lib/remotion/ink/`, drawn as SVG paths with seeded jitter for the line boil. Build it with the first film
  that needs it and keep scenes as data.

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

## 13. Discovery and packaging: how YouTube finds our films (analysis, 2026-10-24)

> "Most important, making the curiosity is also the most important thing: thumbnail, title and YouTube description
> simple, yet how actually our video comes up when someone searches on YouTube … match how the YouTube algorithm works
> for search, suggestions, browse features." (owner, 2026-10-24)

### 13.1 How the system works (what YouTube itself says)
Sources: YouTube Help *How YouTube search works* (answer 16090438), *Discovery and performance FAQs* (141805), *Tips
for video descriptions* (12948449), *Add tags* (146402), *Traffic sources* (1714921), *Test & compare* (13861714),
youtube.com/howyoutubeworks (recommendations), and YouTube's growth and discovery lead Todd Beaupré on Creator Insider
(interviews reported by Search Engine Journal, 2025, and PPC Land, 1 Sept 2026, from an auto transcript). Read on
2026-10-24; links in §13.12. Third-party "algorithm guides" were read too, but only the official points are treated as
fact. Precise weights you see on blogs ("the first 30 s count 40%") are guesses, not YouTube figures.

**It pulls, it doesn't push.** "A lot of creators think of YouTube as pushing videos out to a bunch of people, but it's
actually more the reverse" (Beaupré). When a viewer opens the app, the system picks, for that one person, the videos
it expects them to watch and be glad they watched. *So:* there is no "the algorithm" to please, only viewers. Each film
must be the best choice for a specific kind of viewer at the moment they see it.

**It judges each video on its own.** "The algorithm for Discovery is focused more on individual videos"; there is no
penalty box for a weak video or a break, and historical data is not over-weighted when it doesn't predict the next
video (Beaupré). Old videos can come back when a topic becomes relevant again. *So:* evergreen films keep earning; a
flop doesn't sink the channel; never delete or rush.

**What it measures.** Viewing behaviour (what people watch, skip and search for), "absolute and relative watch time",
likes and dislikes ("some of the hundreds of signals"), "Not interested" feedback, and satisfaction surveys (YouTube
Help 141805, howyoutubeworks). Beaupré: "No metric on its own is a good indicator of value" and "We don't want to just
assume that all time is valuable": surveys separate time spent from time people were glad they spent. *So:* a click the
film doesn't pay off (clickbait) can hurt more than it helps, and a viewer who finishes satisfied is the real win.

**Three doors, three different rules.**
| Door (Studio traffic source) | What it is | What decides it | What we control |
|---|---|---|---|
| **YouTube search** | Results for a typed query | **Relevance** (how well the title, description, tags and *video content* match the query), **engagement** (e.g. watch time for that query), **quality** (channels showing expertise, authority and trust on the topic), plus the viewer's own history (Help 16090438) | The words people type, in the title, description, chapters and the spoken narration (YouTube reads the captions); accurate captions uploaded; real depth on the topic |
| **Browse features** | Home feed, subscriptions, Watch Later, Explore (Help 1714921) | The viewer's interests and history, and how similar viewers responded to the video (Help 141805) | The thumbnail and title (that is all the viewer sees), and the satisfaction of those who clicked |
| **Suggested videos** | "Up next" beside and after other videos, and links in descriptions (Help 1714921) | What the viewer is likely to watch next, given what they're watching and their history. "Not simply just because it's related": it follows what viewers actually watch together (Beaupré) | Films that people who watch big India documentaries also want; our own series, playlists and end screens chaining one film into the next |

**New channels.** With no viewer history, the system matches what the video is about with viewers' topic interests;
if no interested audience emerges, impressions stop (Beaupré, Sept 2026, as reported). New uploads reach people who
have never watched the channel within the first hour, and the system learns separately for subscribers and non-subscribers.
Beaupré's advice to a small channel: go deep into one audience rather than wide, and build a catalogue so a viewer who
finds you can watch more. *So:* stay in one clear lane (§4.3), make every film's subject unmistakable from its
title, thumbnail and first minute, and group films into series.

**Subscribers are not the audience.** "Even your best videos, 90% of the time, your subscribed audience isn't deciding
to watch," and a 10% or lower click-through rate is normal (Beaupré). *So:* package every film for a stranger, not for
fans.

**Series hold viewers.** "Viewers don't want to be picking up the remote every five to 10 minutes to make a new video
decision" (Beaupré, about living-room viewing). Playlists and series keep a session going.

**Upload frequency doesn't drive growth.** "Growth in views across uploads is not correlated with time between uploads"
(Help 141805). *So:* never rush a film to keep a schedule. Quality first, always.

**Tags barely matter.** "Tags play a minimal role in your video's discovery"; they help only when the subject is
commonly misspelled. "Your video's title, thumbnail, and description are more important" (Help 146402). Stuffing
tags into a description breaks the spam policy.

**Descriptions do matter for search.** YouTube's own tips: pick 1–2 main words that describe the video and feature
them prominently in both the description and the title; "pretend you're searching for your video, what would you type
into the search bar?"; the first few lines are what viewers see first; every video needs a unique description; use
chapters; link playlists (Help 12948449).

**Chapters reach Google too.** Google Search shows "key moments" for videos and gives priority to the ones a creator
sets, including "the exact timestamps and labels in the video description" for YouTube videos (Google Search Central,
video structured data). Chapter titles are search phrases in their own right.

**Thumbnail tests are judged on watch time, not clicks.** Test & Compare shows up to three thumbnails evenly and picks
the one with the highest **watch time share**, because a click-only winner "may determine a different winning
thumbnail" than one people keep watching (Help 13861714). Title testing is rolling out to some channels. *So:* the
best package is the one that attracts the viewers who will stay.

**Misleading packaging is against the rules.** Titles should "accurately represent the content"; avoid "deceiving,
misleading, clickbaity or sensational" titles and thumbnails (Help 141805).

**Language.** Channels that dub most of their watch time do better, and translated titles and descriptions should be
uploaded with the dubs (Beaupré, 2025). A later step for us (§17).

### 13.2 What this means for us: the rules
1. **Package first.** Before the script is written, draft the title and the thumbnail idea in `films/<slug>/brief.md`.
   They are the promise; the script's first 30 seconds must deliver it, and the whole film must pay it off.
   *Why:* browse and suggested viewers decide on the package alone, and satisfaction depends on the film keeping its
   promise.
2. **Curiosity first, keyword second, honesty always.** The package must make a stranger feel a question only the
   film answers (§13.3), while the title and description carry the words people search, and everything is true.
3. **Write for one viewer.** Each brief names the viewer the film is for ("an engineering student in Chennai who
   loves big machines", "a 50-year-old in Pune who grew up with Bajaj scooters") and the big videos they already watch.
   Suggested traffic comes from sitting next to those.
4. **Search words come from real searches.** For each film: YouTube autocomplete (`gl=IN`, `hl=en`) for the subject,
   the top 20 results (what exists, how they're titled), Google Trends (India), and once the channel has data, the
   Studio **Research** tab (what our viewers and others search for) and the **search terms** report on each video.
   Save the list in `films/<slug>/research/search_terms.md`: one **main phrase** (the exact words most people type),
   2–4 **secondary phrases** (names, places, years, alternate spellings), and the **curiosity question** people ask.
5. **The narration says the main phrase naturally** in the first minute, and secondary phrases where they belong
   (YouTube reads the video content). Never forced: the story comes first.
6. **Upload our exact captions** (the English SRT from the locked script) with every film: accurate words for search
   and for viewers watching without sound.
7. **Series and chains.** Every film belongs to a playlist series; its end screen points to the next film; its
   description links the series playlist; a pinned comment asks one question. *Why:* suggested traffic and longer
   sessions.
8. **Test every film.** Three thumbnails in Test & Compare from the first hour (title tests too, when Studio offers
   them). Record the winner and its watch-time share in §16 after it finishes.

### 13.3 Curiosity: the heart of the package
The one test for any title + thumbnail: **a stranger who sees it for one second on a phone feels a question they need
the film to answer.** If they don't, it fails, however beautiful it looks.

How curiosity works: people get curious when they know *some* of something and can see the gap (Loewenstein 1994).
So the package gives a known reference point and opens a specific gap: not vague mystery ("You won't believe…"), and
never the answer.

**Five curiosity shapes that suit our films** (examples are shapes, not checked claims):
| Shape | Title pattern | Why it pulls |
|---|---|---|
| **The paradox** | "India Reached the Moon. Why Does It Still Import Magnets?" | Two facts that shouldn't both be true |
| **The bet** | "The Tata Bet That Nearly Lost Everything" | An open outcome: did it work? |
| **Hidden in plain sight** | "Why Indians Still Buy Gold When Shares Pay More" | Something you see daily has a secret |
| **The origin** | "How a Village in a Jungle Became India's Steel City" | A transformation you want to see happen |
| **The unlikely detail** | "The Steam Engine Still Running Since 1855" | A specific, surprising fact you want to check |

Rules for the pair:
- **The title carries the subject and the search words; the thumbnail carries the emotion and the visual question.**
  They work together and never repeat each other.
- **Specific beats vague.** A number, a name, a place, a year ("1903", "₹2,000 crore", "one man") makes a gap feel real.
- **Never answer the question** in the title or the thumbnail.
- **Never lie, never exaggerate.** Every word is paid off in the film, ideally the core of it in the first 30 seconds.
  YouTube's surveys and watch-time tests punish packages that over-promise.

### 13.4 Title
- **The main search phrase in the first ~40 characters**, said in natural words a person would type; the curiosity
  in the same line. Phones cut long titles, so the part a phone shows must work on its own. Aim for ≤ 60 characters;
  100 is YouTube's hard limit.
- No `!`, no ALL CAPS sentences (one capitalised word at most), no hype words, no emoji.
- **No channel suffix (owner, 2026-10-24).** On the sister channel the one breakout title had no suffix, and the
  suffix used about half of what a phone shows.
- Deliver the title in a click-to-copy code block, plus two alternatives (each in its own block) for title testing.

### 13.5 Thumbnail (lessons from Creator, owner 2026-10-22: "we are failing at thumbnail, that's why low CTR")
1. **One real thing, big.** A face, a machine, an object, a moment, recognisable in under a second. Real photos first;
   composites only to place the film's subject in a real scene; never AI images of real people, never a fake face.
2. **A visual question.** Something surprising, out of scale or out of place: a tiny object with a giant consequence,
   a red circle on one detail, a "before → after" split.
3. **Words add, never repeat, never answer.** 2–4 words, at most 5: a number, a name, a stake ("1903", "ONE MAN",
   "STILL RUNNING"). Never the title's own words, never a sentence.
4. **Bright or high contrast.** YouTube's app is dark, so a dark card sinks. Our charcoal-and-bronze world works only
   with a strongly lit subject and one bright accent (gold or warm white) on one word.
5. **Phone test.** Check at 168×94 px with the duration badge: nothing important in the bottom-right corner, words
   readable, subject clear. Also check beside 8 real competitor thumbnails from the same search (port Creator's
   `scripts/thumb_feed.py`, §15): ours must stand out in that row.
6. **Faces work.** When the story has a real person, their real archive face with a strong expression is the
   strongest lever (credited, licence checked). If the owner ever sends his own photos, they go opposite the text.
7. **Build and test.** 3+ concepts as HTML, shot with Playwright at 1280×720 JPG, an independent click panel (a no-repo
   session judging our thumbnails among competitors' at phone size), then a main and two challengers for Test &
   Compare.

### 13.6 Description (simple, but built for search)
YouTube shows the first lines in search results and above "…more", and reads the whole description for relevance.
The owner wants it simple. So: short plain lines, the right words, nothing else.

```
<Line 1: one plain sentence with the main search phrase and the curiosity: what the viewer will find out.>
<Line 2–3: who and what the story is about, naturally using 2–3 secondary phrases (names, places, years).>
<Line 4 (optional): why it matters to India today.>

CHAPTERS
0:00 <the cold open, named with a search phrase>
1:12 <chapter named as a phrase people search, e.g. "How the Taj Mahal Palace hotel was built">
...

<Series line once a playlist exists: "More from the series <name>: <playlist link>">
#<Main topic> #<Second topic> #<India topic>
```
- **Chapters:** from `0:00`, at least three, each ≥ 10 s long, taken from the exact file the owner uploads. Name them
  like search phrases and story beats at once ("Why Jamshedpur was chosen", not "Chapter 3").
- **Hashtags:** at most three, accurate and specific, on the last line (YouTube shows up to three description
  hashtags by the title; Help 6390658). Never more than three, never unrelated ones.
- **No** sources list, credit roll, disclaimers or links other than the series playlist (the sister channel's owner
  rule, 2026-10-17: "simple description and timestamps"). Exceptions: a licence that requires a description credit
  (CC BY attribution can be on screen in the end credits instead: prefer that), a finance or synthetic-content line
  the rules require (§9.4), and a correction line after an error.
- Unique to each film; never paste the same description twice.
- Save in `films/<slug>/youtube/description.md`, and paste it in the final reply as a click-to-copy block.

### 13.7 Tags, pinned comment, end screen, playlists
- **Tags:** only alternate spellings and common misspellings of the subject (Jamsetji / Jamshedji, Bharat / India,
  Dhirubhai / Dhirubai). That is the one case YouTube says tags help.
- **Pinned comment:** one question that invites real answers ("Did someone in your family work at a mill? Which
  one?"). Comments are human reactions; reply to the first ones.
- **End screen:** the next film in the series + subscribe, over the bridge line (§5.2), from the last 10–15 s.
- **Playlists:** one per series, in story order, titled with search words ("Empires of India: How Indian Companies Were
  Built").

### 13.8 After publishing: read, learn, adjust
Check Studio at **48 hours, 7 days and 28 days** (ask the owner for screenshots of the Reach and Engagement tabs; the
owner reads Studio on the phone):
- **Impressions and click-through rate per traffic source** (browse, suggested, search). Low CTR with good retention:
  the package fails the film; try a new thumbnail through Test & Compare. High CTR with a steep early drop: the film
  breaks the package's promise; fix the first 30 s in the next film.
- **Retention at 0:30 and 1:00** (targets in §5.1) and **average view duration**. Bumps (rewinds) show what people
  loved; cliffs show where they left. Write both into §16 with the timestamps and what was on screen.
- **Search terms report:** the real words that found the film; feed them into the next film's research.
- Don't change what's working (Help 141805); don't judge a film only on its first days (videos can find their audience
  later).

### 13.9 Shorts
2–3 vertical cuts (30–50 s) from the strongest scenes of each film, each a complete mini-story with its own hook in the
first second, related to the full film with YouTube's related-video link. Shorts bring subscribers and new viewers; long
films earn the watch hours.

### 13.10 Delivery
Upload the 4K master and a 1080p copy to `Built-on-Bharat/<slug>/` with `scripts/upload_gdrive.sh --sub <slug>`; send
the thumbnails, contact sheet, SRT and `youtube/description.md` with `SendUserFile`; report in plain words.

### 13.11 The YouTube package, every final film (checklist)
- [ ] Main thumbnail + 2 challengers (1280×720 JPG), phone-tested beside competitors.
- [ ] Title in a click-to-copy block + 2 alternatives; main phrase in the first ~40 characters.
- [ ] Description in a click-to-copy block (§13.6), chapters from the exact upload file.
- [ ] English SRT captions from the locked script.
- [ ] Tags (spellings only), pinned comment question, end-screen target, playlist.
- [ ] Shorts cut list.
- [ ] Saved in `films/<slug>/youtube/`; title and description pasted in the final reply.
- [ ] **Close-out:** commit, push the session branch, open a PR to `main`, merge it, tell the owner which branch to
      delete, archive the session.

### 13.12 Sources (read 2026-10-24)
- How YouTube search works: https://support.google.com/youtube/answer/16090438
- Discovery and performance FAQs: https://support.google.com/youtube/answer/141805
- Tips for video descriptions: https://support.google.com/youtube/answer/12948449
- Add tags to your video: https://support.google.com/youtube/answer/146402
- Hashtags: https://support.google.com/youtube/answer/6390658
- Traffic sources: https://support.google.com/youtube/answer/1714921
- Test & compare thumbnails: https://support.google.com/youtube/answer/13861714
- How YouTube works, recommendations: https://www.youtube.com/howyoutubeworks/product-features/recommendations/
- Beaupré interview, 2025: https://www.searchenginejournal.com/how-youtubes-recommendation-system-works-in-2025/538379/
- Algorithm myths, YouTube growth team: https://www.searchenginejournal.com/youtube-algorithm-myths-debunked-insights-from-the-growth-team/510091/
- Beaupré on Creator Insider, 1 Sept 2026 (as reported): https://ppc.land/subscribers-skip-90-of-uploads-in-their-feed-youtube-director-says/
- Google key moments: https://developers.google.com/search/docs/appearance/structured-data/video
- Loewenstein, G. (1994). The psychology of curiosity. *Psychological Bulletin*, 116(1), 75–98.
- Green, M. C., & Brock, T. C. (2000). The role of transportation in the persuasiveness of public narratives.
  *Journal of Personality and Social Psychology*, 79(5), 701–721.

## 14. Review gates

Nothing reaches the owner without passing all of these (and §1's "polished only").

### 14.1 Script gate
- [ ] `claims.csv` complete, gate script passes; every changed line re-checked.
- [ ] Cold open in motion, promise by 0:25, open loop by 0:55, no banned openers, channel name only in the outro.
- [ ] A named human in every chapter; reaction beats after big turns; respect rules (§4.1) met.
- [ ] Storytelling never invents a fact, quote or outcome; legends labelled.
- [ ] The lean-in test on every paragraph (Q column filled), spoken-English check, and the independent audience review
      with no viewer drifting in the first minute (§7.4, §7.8).
- [ ] Package written first: title, thumbnail idea and search terms in the brief; the first 30 s deliver the promise;
      the main search phrase is said naturally in the first minute (§13.2).

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
- `prompts/audience_review_v1.md` → rewrite for story films (the lean-in map, teacher/news-reader/flat lines,
  package promise, §7.8).
- `.claude/skills/` (fact-check, source-media, review-cut, deliver, parallel-render) → rewrite for this channel and
  Remotion as they are first used.

---

# Part D

## 16. Lessons log
*(Newest first. Each lesson: what happened, the rule, why.)*

**Block 16 retake: R.B.I. (2026-10-27).**
- *What happened:* in the v6 take of block 16, Akash said both "R.B.I." as "R and B.I." (speech-to-text heard
  "RNBI" twice); `vo_review.py` passed it because the word diff ignores how an acronym is split. The owner changed the
  spelling in the recording box and re-recorded the block; the new take is heard as "RBI", 100% of the words, same
  voice (pitch −0.1 st). The full VO was re-timed: only chapters 9 and 10 moved (by 15 frames).
- *The rule:* after every take, look at each letter-by-letter acronym in `words.json` (R.B.I., T.C.S., J.R.D.): an
  extra word or letter inside it ("RNBI") is a misread, even when the report says 100%. Retake only that block, keep
  the rest, and re-run `vo_timing.py`. Drive keeps each round in `<slug>/vo/vN/` (v7 holds the new b16 and the joined
  `vo_full.wav`).

**Recording v6 (2026-10-25).**
- *Tags out entirely:* the owner judged even pause tags "not coming good"; v6 was recorded from plain text (commas and
  full stops). Result: 17 takes, 22 min 30 s, a steady 14–16 characters a second in every block.
- *Uploads with reused numbers:* the upload folder keeps every earlier take, and the new files share their numbers
  (`…-2.mp3`), so a glob picked nine v4 takes. Always copy the exact files named in the owner's latest message, then
  compare checksums with older takes and characters-per-second with each block before timing.

**Narration v6: the middle-class lens (owner, 2026-10-25).**
- *The owner:* "Most of the Indians are from middle class, so they seek for motivation and they see how a good empire
  starts, from rich or from poor having nothing in hands." Every film shows **where each founder really started**
  (family, money, education) and **the fall and the comeback**, told through the viewer's own life: the house gold
  pledged in a crisis, school fees first, savings for a daughter's wedding, the ride home after a failed interview.
- *Honest, never a reel:* the audience panel caught "it began at the top" and "every one of them risked the same" as
  overclaims. Admit privilege first ("Yes, he was born a Tata. But look at how he started."), and say what is true
  ("doesn't begin with a fortune", "put something on the line").
- *Record whole, not stitched:* the owner prefers one full re-recording over spliced blocks, so one voice and one
  energy run through the film. Blocks never split a moment: a beat that answers or refers back ("Isn't that…",
  "He says…") stays in the same take as the beat before it.
- *Length:* the panel's cut list (flight log, side deals, tacked-on news) took v6 from about 26 to about 23 minutes
  without losing the spine.

**Shared systems for film 1: INK figures, map, furnace, ownership, kinetics (S2, 2026-10-25).**
- *INK, first pass looked like clip-art:* round tube limbs, ball hands and pantaloon dhotis. What fixed it: tapered limbs
  (upper arm wider than forearm), mitten hands along the forearm, shaped feet, the dhoti as one drape whose crotch rises
  as the legs part (no web from knee to knee in a stride), and line weight from the light: each mass is outlined twice,
  the second copy nudged away from the light, so lines are thin where lit and heavy in shadow.
- *INK masses:* draw every shape's outline first, then every fill, and the shapes merge into one silhouette with one
  clean outline (both dhoti legs, a turban and its tail). Joints are jittered once per 12 fps tick with a stable id
  (never seeded by position, or the boil runs continuously as the figure moves).
- *One SVG filter per figure* gives the ember rim (silhouette minus a copy shifted away from the light), a soft form
  shade and ink cross-hatching (`feImage` of a data-URI tile + `feTile`) on the far side. `feImage` data URIs work in
  Remotion's headless Chrome. Move the hatch tile with the figure or it slides (shower-door effect).
- *Faces for dignified beats:* a filled moustache shape reads as pouting lips; two brush strokes falling from the
  centre read as a moustache. Keep the mouth a short thin line; eyes small with a lid line.
- *Render cost (4-core container, concurrency 4, `--gl=swangle`):* INK scenes with 15–45 filtered figures measured
  ~0.54 s a frame at 1080p and ~2.3–2.8 s a frame at 4K (`--scale=2`), measured while stills were rendering alongside,
  so treat as upper bounds. A 20-minute film of INK alone would be ~19 h at 4K: use INK for short beats and render
  them in shards.
- *India map:* `scripts/india_map.py` turns Natural Earth's India POV file into `lib/remotion/map/indiaGeo.ts`
  (Lambert azimuthal equal-area on 80°E 22°N, 1 unit = 3 km, 14k points, sharp at 4K). Douglas–Peucker collapses a
  closed ring (start = end, every distance is zero): split each ring at its farthest point first. Draw coastlines by
  stroking every country thick, then filling them all: shared land borders get covered, only the coast keeps a line;
  then draw borders on top (thin today, faint dashes on period maps such as the 1932 flight).
- *Furnace cutaway:* a mechanism reads when its parts move on the voice: each charge drops on its word, the blast
  races through the main and bustle ring as bright dashes, the tap bursts with sparks. Lumps (seeded polygons) beat
  flat colour bands for the burden; tuyere pipes drawn over the cut interior read as spikes, so they run behind the
  back wall and only the glowing nozzles show. Sources and what is still unchecked: `scenes/design-reference.md`.
- *Ownership machine:* a filled box with labels reads as a bar chart. What made it a machine: a girder frame with
  rivets and cross-bracing, a ladle that tilts and pours, metal that cools from white-hot to bronze with cast lines,
  steel blocks that drop and jolt the frame, and the diamond's glint as the one white point. Shares stay to scale; the
  only numbers on screen are the VO's ("TWO THIRDS", "28%"), the other holders are named, not numbered.
- *Kinetics:* an odometer column turns only while every column below shows 9 (recursive carry); a naive
  remainder formula left the thousands digit half-rolled at 1932. Blur only the columns that are moving. Calendar day
  grids come from Zeller's congruence, not typed by hand. "To scale" for gems means area ∝ weight^(2/3) (similar
  solids), each outline scaled to its own polygon area; the maths sits in a comment in `GemCompare.tsx`.
- *Wikimedia Commons* answered 429 after about five file downloads in a minute (Special:FilePath and
  upload.wikimedia.org alike) and kept refusing for 20+ minutes: fetch references early, a few at a time.
- *Remotion CLI:* `--crf` and `--video-bitrate` cannot both be set; use `--video-bitrate` as the cap (14M at 1080p60,
  45M at 4K60 for tests). `interpolate()` with an `Infinity` input range throws: default "never" to `1e9`.

**Building film 1 in Remotion (2026-10-25).**
- *Timing without transcription:* `scripts/vo_timing.py` joins the takes, gives every chapter turn a 1.4 s breath (even
  inside a take: chapters often start mid-block), places sentences with Creator's silence aligner and snaps clause
  boundaries to the voice's own pauses. 427 sentences, 3,329 words, 9 flagged (all short punch lines read slowly).
- *Initials split sentences:* "N. Chandrasekaran" became two sentences and shifted a block's timing; the splitter now
  never splits after a single capital and a dot.
- *WebGL in the container:* `--gl=swangle` works for `@remotion/three`; `--gl=angle` failed. Build environment maps in
  `onCreated` (an effect runs after a still is captured: the scene came out black). Glass transmission renders as a
  milky blob in software GL: fake gems with mirror facets in a designed studio environment.
- *A code-built diamond did not reach film quality in four tries* (milky, then black, then smoky quartz). Real diamond
  footage under a RECONSTRUCTION label beats it: real before made (§6.3.6).
- *Remotion serialises composition props:* a component passed in `defaultProps` arrives as undefined (React error 130).
  Wrap chapters in closure components.

**First full recording, Tata film (2026-10-24).**
- *Emotion tags sound synthetic on Akash v4:* the owner heard the feeling change at each `[curious]`/`[warmly]`/
  `[serious]`. Rule: pause tags only; the feeling comes from the writing (§7.5).
- *`...` gives no pause:* measured on all 11 takes, every mid-sentence `...` got under 0.2 s; `[pause]` got 0.6–1.0 s.
  Rule: `[short pause]`, `[pause]`, `[long pause]` only.
- *The voice held:* with no voice-description tags, all 11 takes sat within 0.6 semitones and 0.003 timbre distance of
  each other. Pace measured 155–181 wpm; the faster blocks were the ones dense with dates and numbers.
- *Speech-to-text can skip:* faster-whisper stretched one word over 2 s and dropped a 7-word line that Akash did say;
  `vo_review.py` now re-transcribes any word longer than 1 s on its own (§7.9).
- *Length:* the owner wants the Tata film at about 20 minutes, richer and with no dull stretch (2026-10-24). The topic
  carries it: a 150-year story with five eras.

**Brand rebuild, sting and first-film research (2026-10-24).**
- *The generator's sparkle mark:* a straight texture copy left a lighter patch on the logo (the vignette makes
  nearby texture brighter), and on the banner the copied patch pulled in part of the wafer. Fixes: Poisson blending on
  the logo; on the banner, a horizontal shift that lines the blueprint's vertical line up with its neighbour, with
  inpainting only where the source overlapped the star (`scripts/brand_clean.py`).
- *Cutting the medallion out:* a fitted circle found only the face and missed the side wall. The outermost strong
  edge on 1,440 rays, median-smoothed, then an ellipse, fits within ~2 px all round (`scripts/brand_medallion.py`).
- *Remotion 4.0.534 in the cloud:* `remotion still` and `render` found a browser on their own; 4K (`--scale=2`) at 60 fps
  rendered at ~3.5 frames a second for a 2D scene with ~140 animated elements.
- *Sting review:* a ring-shaped "strike flash" read as a flat cream band, and equal-speed sparks read as a sunburst
  graphic. A blurred, warm copy of the metal as a bloom, and sparks with skewed speeds, delays and gravity biased to the
  lower rim look real. Look at real frames, not the code.
- *Topic research:* YouTube search and autocomplete answer from the container (desktop User-Agent; a mobile one
  returns a page without `ytInitialData`). `scripts/yt_demand.py`. Many Hindi channels use English titles, so judge
  language by channel.

**YouTube algorithm analysis and narration rules (2026-10-24).** The owner asked for a full analysis of how YouTube
search, suggested and browse work before any film, and made narration and curiosity the top priorities. Read YouTube's
own help pages and its discovery lead's interviews (§13.12). Main findings: recommendations pull per viewer, not push;
each video is judged on its own; satisfaction (surveys, likes, "not interested") sits beside watch time; search ranks by
relevance (title, description, tags, video content), engagement and quality; tags barely matter; thumbnail tests pick
by watch-time share, not clicks; new channels get matched by topic, so one clear lane and series. Written into §13;
narration craft into §7.

**Channel setup (2026-10-24).** Repo started; CLAUDE.md and this playbook written from the owner's directive (Part G)
and Creator's lessons. Drive folder `Built-on-Bharat` and `_Channel/` created; logo and banner originals uploaded there.
The two brand images are 2048×2048 and 2752×1536 PNGs (about 8 and 7 MB); git holds 1024/1920 px JPG reference copies
only. Both carry the generator's sparkle mark bottom-right (clean before use, §6.5).

## 17. Decisions and open questions

**Decided (owner, 2026-10-24):**
- New channel Built on Bharat; Remotion stack; 60 fps; the motion directive in Part G.1; cinematic storytelling with
  fully checked facts; Indian emotion, humanity and respect; polished deliveries only; Drive folder `Built-on-Bharat`.
- **Narration and curiosity in the package come first** (§7, §13). **Claude is the creative director;** rules are a
  reference, not a ceiling; the hard lines never bend (§2.1).
- **Voice: Akash** (ElevenLabs, Eleven v4) for now. Later, a thorough search of the ElevenLabs voice library for a
  better story voice; if none is better, Akash stays.
- **Language:** English narration for all of India; Hindi/Telugu audio tracks later, once the channel qualifies.
- **Titles:** no channel suffix.
- **Description:** 2–4 plain search-built lines, chapters, the series playlist link and up to 3 hashtags (§13.6).
- **Logo:** Claude removes the generator's mark and rebuilds a clean transparent medallion and an animated outro sting
  from it, at production quality.
- **First film:** "The Entire History of Tata, and the Diamond That Saved It" (`films/tata-history/`): the full
  history with the 1924 Jubilee Diamond as its spine, ending on the open 2026 Trusts–Sons question (owner's choice
  after the research and his own dossier).
- Length: topic decides, about 10–16 min as a guide. 4K at 60 fps via `--scale=2`. No fixed sign-off line yet.

**Open:**
- `ELEVENLABS_API_KEY` in the environment would give exact word timings with each take (otherwise alignment, §10.4).
- Upload schedule, and whether Shorts start from film 1.

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

## G.3 Owner's message (2026-10-24, second)

> And most important making the curiosity is also the most important thing, thumbnail, title and YouTube description
> is simple yet how actually our video comes out [when] someone searched on YouTube, make the description to match how
> YouTube algorithm works for search, show suggestions, browse features etc. and fully analyse the YouTube algorithm
> first then update to docs. Narration is the most important thing. Not like teacher, not like news reader, not like
> flat. We should hold audience, they should get immersive experience, they should lean into story.

*(Lightly punctuated; "[when]" added for reading.)*

## G.4 Owner's message (2026-10-24, third)

> And Claude, yes, you only. Always should be creative director for everything. Be creative always and be smart and
> always stick to rules. Rules not the ceiling, they are for reference. Creative brains don't have limits. And ask your
> clarification, I do select answer. Finalise the Claude docs and also update Creator Claude and playbook with all of
> this creativity things and YouTube algorithm things and curiosity things.

*(Lightly punctuated for reading.) Answers he selected the same day are recorded in §17.*
