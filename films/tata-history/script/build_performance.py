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
MAP: list[tuple[str, str]] = [
    # v6 recording (owner, 2026-10-25): no tags at all; the recording text is vo.txt itself (commas and full stops)
]


def main() -> None:
    vo = (HERE / "vo.txt").read_text()
    perf = vo
    rows = ["# (exact text in vo.txt)\t(the same text with its pause tag)",
            "# v6 (2026-10-25): full re-record; pause tags only ([short pause], [pause], [long pause]); no emotion tags, no '...'"]
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
