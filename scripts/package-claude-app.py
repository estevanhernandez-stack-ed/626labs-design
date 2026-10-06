#!/usr/bin/env python3
"""Build the zip to upload as a skill in the Claude app (claude.ai >
Settings > Capabilities > Skills > Upload). The app can't reach this repo, the
hub or the marketing repo, so everything the skill needs travels inside it.

    python scripts/package-claude-app.py      # -> dist/626labs-design.zip

Ships SKILL.md, README.md, the two stylesheets, the woff2 fonts with their
CSS, assets/, preview/ and ui_kits/. Leaves out repo plumbing, the raw
uploads/ and the TTFs (the woff2 carry the same faces). Zero dependencies.
"""
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dist" / "626labs-design.zip"
KEEP_FILES = {"SKILL.md", "README.md", "colors_and_type.css", "editorial.css"}
KEEP_DIRS = {"fonts", "assets", "preview", "ui_kits"}


def main() -> int:
    tracked = subprocess.run(["git", "-C", str(ROOT), "ls-files"], capture_output=True,
                             text=True, check=True).stdout.split("\n")
    files = []
    for f in filter(None, tracked):
        parts = Path(f).parts
        if (len(parts) == 1 and f in KEEP_FILES) or (parts[0] in KEEP_DIRS and not f.endswith(".ttf")):
            files.append(f)
    if "SKILL.md" not in files:
        sys.exit("SKILL.md is not tracked")
    OUT.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(files):
            z.write(ROOT / f, f"626labs-design/{f}")
    print(f"{OUT} ({OUT.stat().st_size // 1024} KB, {len(files)} files)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
