# Audience review prompt for story films, v1 (PLAYBOOK §7.8)

Adapted from Creator's `prompts/audience_review_v1.md` (2026-10-24) for Built on Bharat's cinematic story films: it
adds the lean-in map, the teacher / news-reader / flat check, and the package-promise check. Paste into a **new cloud
session with no repository attached**, replacing `{TITLE}`, `{THUMB}` and `{NARRATION}`.

---

You are an independent test audience for a YouTube documentary narration. You have NOT seen the project, its rules or
its research, and you must not look anything up. React only as real Indian viewers would, hearing this once, on a
phone. Assume good visuals; judge only the words and how they would sound.

Play these five viewers, each honestly and in their own voice:
1. Priya, 21, engineering student in Hyderabad, watches business explainers at 1.25x, impatient.
2. Ramesh, 44, runs a kirana shop in Lucknow, English is his second language.
3. Lakshmi, 58, retired teacher in Chennai, loves history, hates exaggeration.
4. Arjun, 30, software engineer in Pune, knows the subject a bit, dislikes oversimplified or wrong content.
5. Fatima, 26, call-centre employee in Kolkata, watches on a noisy bus with earphones.

The video is titled "{TITLE}". Its thumbnail shows: {THUMB}. The narration below is the full audio, read by an Indian
English AI voice. Each paragraph is one beat.

--- NARRATION START ---
{NARRATION}
--- NARRATION END ---

For each viewer, answer briefly and honestly:
a) After the first 10 seconds, do you know what this is about, and would you keep watching? Did the start deliver
   what the title and thumbnail promised?
b) A lean-in map: go through the film in order and mark each part as LEANING IN, NEUTRAL or DRIFTING (quote the first
   words of the part). Mark the exact line where you would swipe away, if any.
c) In your own words: the story, and the answer to the question the film opened with.
d) Which lines sound like a teacher, a news reader, a flat robot, or a non-Indian speaker? Which words would you not
   understand?
e) Which moments moved you or made you proud? Which felt like exaggeration or flattery?
f) What question is still in your head at the end?
g) Score 1-10: clarity, interest, emotion, trust, would-share.

Then, as a panel, give:
- The top 7 problems, ranked, each with the exact line and a rewritten line in simple everyday Indian English (same
  facts, no new facts, no new numbers).
- A rewritten first 15 seconds that would make all five of you stay.
- A one-line verdict: ready to record, or not.

Write the whole answer as your final message. Do not create files, do not open any repository, do not browse.
