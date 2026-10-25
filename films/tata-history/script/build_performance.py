#!/usr/bin/env python3
"""Build vo_performance.txt and performance_map.tsv from vo.txt (PLAYBOOK §7.5, v4: pause tags only).

Each MAP row is (exact text in vo.txt, the same text with its pause tag). The spoken words must stay identical to the
fact-checked vo.txt; the script stops if any row no longer matches exactly once or a spoken word changed.
Run from the repo root: .venv/bin/python films/tata-history/script/build_performance.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parents[2] / "scripts"))
from vo_review import norm_words  # noqa: E402

S, P, L = "[short pause]", "[pause]", "[long pause]"
MAP = [
    ("The plane over your head. Tata.", f"The plane over your head. {P} Tata."),
    ("Two hundred and forty five carats. More than twice", f"Two hundred and forty five carats. {S} More than twice"),
    ("Why send our cotton away, when we can spin", f"Why send our cotton away, {S} when we can spin"),
    ("But healthy workers were the sure foundation", f"But healthy workers {S} were the sure foundation"),
    ("It's a great story, isn't it? But historians", f"It's a great story, isn't it? {S} But historians"),
    ("Hold on to this hotel. It comes back", f"Hold on to this hotel. {S} It comes back"),
    ("But three months later, on a trip to Germany, Jamsetji Tata dies.",
     f"{P} But three months later, on a trip to Germany, {S} Jamsetji Tata dies."),
    ("the Tatas take a huge risk. They ask India.", f"the Tatas take a huge risk. {S} They ask India."),
    ("about eight thousand Indians put up the entire capital. Two crore",
     f"about eight thousand Indians put up the entire capital. {S} Two crore"),
    ("If he had kept his promise, he would have", f"If he had kept his promise, {S} he would have"),
    ("Jamshedpur. After the man who never saw it.", f"Jamshedpur. {S} After the man who never saw it."),
    ("It isn't.", f"{P} It isn't."),
    ("So we're back in that bank in Bombay.", f"{P} So we're back in that bank in Bombay."),
    ("It was her diamond. And it went into a bank", f"{P} It was her diamond. And it went into a bank"),
    ("And here is the turn in this whole story.", f"{P} And here is the turn in this whole story."),
    ("So the diamond became a hospital.", f"{P} So the diamond became a hospital."),
    ("A charity now owns a big piece of the empire.", f"{S} A charity now owns a big piece of the empire."),
    ("He lands at ten to two in the afternoon.", f"{S} He lands at ten to two in the afternoon."),
    ("Remember that name. One day", f"Remember that name. {S} One day"),
    ("You may know her name. Sudha Murty.", f"You may know her name. {S} Sudha Murty."),
    ("He says, I feel as you would feel", f"{P} He says, {S} I feel as you would feel"),
    ("A long, quiet flight home. Hold on to that silence.", f"{P} A long, quiet flight home. {S} Hold on to that silence."),
    ("His hardest defeat. And his darkest night.", f"His hardest defeat. {S} And his darkest night."),
    ("And who do you think buys them? Tata.", f"And who do you think buys them? {S} Tata."),
    ("Bill Ford told Ratan Tata, you are doing us", f"Bill Ford told Ratan Tata, {S} you are doing us"),
    ("arrives from the Chief Minister of Gujarat. Welcome.", f"arrives from the Chief Minister of Gujarat. {S} Welcome."),
    ("The twenty sixth of November, two thousand eight.", f"{L} The twenty sixth of November, two thousand eight."),
    ("At least thirty one people die at the Taj.", f"{P} At least thirty one people die at the Taj."),
    ("Twenty five days later, the Taj opens", f"{P} Twenty five days later, the Taj opens"),
    ("J.R.D. did not live to see it.", f"{S} J.R.D. did not live to see it."),
    ("June, twenty twenty five. Air India flight", f"{L} June, twenty twenty five. Air India flight"),
    ("Because the Tata family doesn't own Tata.", f"{P} Because the Tata family doesn't own Tata."),
    ("Then, in October twenty twenty four, Ratan Tata died.", f"{L} Then, in October twenty twenty four, Ratan Tata died."),
    ("Who should a company like this really belong to?", f"{P} Who should a company like this really belong to?"),
    # v5 (2026-10-25): origin and rise passages (owner: middle-class viewers want to see how it started)
    ("You already know his name. Jamsetji Tata.", f"You already know his name. {S} Jamsetji Tata."),
    ("And then, almost everything falls apart.", f"{P} And then, almost everything falls apart."),
    ("The papers are worthless.", f"{S} The papers are worthless."),
    ("Do they give up? No.", f"Do they give up? {S} No."),
    ("If you've ever failed, hold on to this.", f"{P} If you've ever failed, hold on to this."),
    ("He started as an apprentice, without pay.", f"He started as an apprentice, {S} without pay."),
    ("at thirty four, the unpaid apprentice", f"at thirty four, {S} the unpaid apprentice"),
    ("At the steel plant in Jamshedpur, he spends", f"At the steel plant in Jamshedpur, {S} he spends"),
]


def main() -> None:
    vo = (HERE / "vo.txt").read_text()
    perf = vo
    rows = ["# (exact text in vo.txt)\t(the same text with its pause tag)",
            "# v5 (2026-10-25): origin passages added; v4 (2026-10-24): pause tags only ([short pause], [pause], [long pause]); no emotion tags, no '...'"]
    for a, b in MAP:
        if perf.count(a) != 1:
            sys.exit(f"MAP row no longer matches exactly once: {a!r}")
        perf = perf.replace(a, b)
        rows.append(f"{a}\t{b}")
    if norm_words(vo) != norm_words(perf):
        sys.exit("spoken words changed")
    (HERE / "vo_performance.txt").write_text(perf)
    (HERE / "performance_map.tsv").write_text("\n".join(rows) + "\n")
    print(f"{len(MAP)} pause tags · spoken words identical ({len(norm_words(vo))})")


if __name__ == "__main__":
    main()
