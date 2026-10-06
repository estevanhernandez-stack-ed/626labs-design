#!/usr/bin/env python3
"""Sync the 626labs-design skill across its homes.

The design system lives in four places (see README "Syncing homes"):

  1. canonical   ~/Projects/626labs-design            <- author + commit HERE
  2. live skill  ~/.claude-personal/skills/626labs-design
                 (git submodule of canonical inside the dotclaude-personal seat
                 repo; syncs by moving the submodule and bumping the seat's
                 pointer. Since 2026-09-30 this one home replaces both the old
                 live clone and the ~/Projects/dotclaude mirror, now archived.)
  3. plugin      ~/Projects/626labs-plugin/plugins/626labs/skills/design
                 (payload copy; SKILL.md is PER-HOME and never copied)
  4. hub         ~/Projects/626labs-hub/Design         (deliberate fork: root-
                 absolute fonts import; REPORT-ONLY, token-value parity check)

The Claude app copy is uploaded by hand: scripts/package-claude-app.py.

Usage:
  python scripts/sync-homes.py --check    # report drift, exit 1 if any (default)
  python scripts/sync-homes.py --apply    # push canonical, move the live
                                          # submodule + bump the seat pointer,
                                          # copy plugin payload (+patch bump)
  python scripts/sync-homes.py --apply --no-push   # same, but no git push

Safety: --apply refuses to touch any home whose working tree is dirty, and
never deletes files. Zero dependencies (Python 3 stdlib + git CLI).
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

HOME = Path.home()
CANONICAL = HOME / "Projects/626labs-design"
SEAT = HOME / ".claude-personal"
LIVE_REL = "skills/626labs-design"
LIVE = SEAT / LIVE_REL
PLUGIN_REPO = HOME / "Projects/626labs-plugin"
PLUGIN_SKILL = PLUGIN_REPO / "plugins/626labs/skills/design"
PLUGIN_MANIFEST = PLUGIN_REPO / "plugins/626labs/.claude-plugin/plugin.json"
PLUGIN_SKILL_REL = "plugins/626labs/skills/design"
HUB_REPO = HOME / "Projects/626labs-hub"
HUB_CSS_REL = "Design/colors_and_type.css"
HUB_CSS = HUB_REPO / HUB_CSS_REL

# Never copied into the plugin home: SKILL.md carries per-home frontmatter
# (standalone `626labs-design` vs plugin-namespaced `design`); the rest are
# repo plumbing, not skill payload.
PLUGIN_EXCLUDE_FILES = {"SKILL.md", "package.json", ".gitignore"}
PLUGIN_EXCLUDE_DIRS = {"scripts"}

drift = []


def run(args, cwd=None, check=True):
    r = subprocess.run(args, cwd=cwd, capture_output=True, text=True)
    if check and r.returncode != 0:
        sys.exit(f"FAILED: {' '.join(args)}\n{r.stdout}{r.stderr}")
    return r


def git(repo, *args, check=True):
    return run(["git", "-C", str(repo), *args], check=check)


def norm(p: Path) -> bytes:
    return p.read_bytes().replace(b"\r\n", b"\n")


def at_main(repo: Path, rel: str):
    """A file's bytes on the repo's origin/main, or None if absent there.

    Drift is judged against what is published, not against whatever branch a
    working tree happens to have checked out: another session's feature
    branch in the plugin or hub checkout made --check report false drift
    (2026-10-06, hub #197)."""
    r = subprocess.run(["git", "-C", str(repo), "show", f"origin/main:{rel}"], capture_output=True)
    return r.stdout.replace(b"\r\n", b"\n") if r.returncode == 0 else None


def payload_files():
    files = git(CANONICAL, "ls-files").stdout.split("\n")
    keep = []
    for f in filter(None, files):
        parts = Path(f).parts
        if parts[0] in PLUGIN_EXCLUDE_DIRS or Path(f).name in PLUGIN_EXCLUDE_FILES:
            continue
        keep.append(f)
    return keep


def dirty(repo) -> str:
    return git(repo, "status", "--porcelain").stdout.strip()


def dirty_tracked(repo) -> str:
    """Modifications to tracked files only — untracked strays can't poison a
    sync from canonical, so they warn rather than abort."""
    lines = git(repo, "status", "--porcelain").stdout.splitlines()
    return "\n".join(l for l in lines if l.strip() and not l.startswith("??"))


def dirty_payload(repo) -> str:
    """Only modifications that would actually propagate stale: payload files
    or SKILL.md. Uncommitted edits to .gitignore/package.json/scripts sync
    nowhere and merely warn."""
    ship = set(payload_files()) | {"SKILL.md"}
    lines = git(repo, "status", "--porcelain").stdout.splitlines()
    return "\n".join(l for l in lines
                     if l.strip() and not l.startswith("??") and l[3:].strip() in ship)


def sha(repo, ref="HEAD") -> str:
    return git(repo, "rev-parse", ref).stdout.strip()


def note(home, msg):
    drift.append(f"[{home}] {msg}")
    print(f"  DRIFT [{home}] {msg}")


def ok(home, msg):
    print(f"  ok    [{home}] {msg}")


def css_tokens(text: str) -> dict:
    return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", text))


def check_canonical():
    d = dirty_payload(CANONICAL)
    if d:
        note("canonical", f"payload files modified (uncommitted):\n{d}")
    other = dirty_tracked(CANONICAL)
    if other and not d:
        print(f"  warn  [canonical] non-payload tracked modifications (won't block --apply):\n        {other}")
    git(CANONICAL, "fetch", "origin", "--quiet")
    behind, ahead = git(CANONICAL, "rev-list", "--left-right", "--count",
                        "origin/main...main").stdout.split()
    if behind != "0":
        note("canonical", f"{behind} behind origin/main — pull first")
    if ahead != "0":
        note("canonical", f"{ahead} ahead of origin/main — unpushed")
    if behind == ahead == "0" and not d:
        ok("canonical", f"clean at {sha(CANONICAL)[:7]}")
    return ahead != "0"


def check_live():
    d = dirty(LIVE)
    if d:
        note("live-skill", f"working tree dirty:\n{d}")
    if sha(LIVE) != sha(CANONICAL):
        note("live-skill", f"at {sha(LIVE)[:7]}, canonical at {sha(CANONICAL)[:7]}")
    elif not d:
        ok("live-skill", "matches canonical")
    if LIVE_REL in dirty(SEAT):
        note("live-skill", "seat repo has an uncommitted pointer bump")


def check_plugin():
    git(PLUGIN_REPO, "fetch", "origin", "--quiet")
    stale = [f for f in payload_files()
             if at_main(PLUGIN_REPO, f"{PLUGIN_SKILL_REL}/{f}") != norm(CANONICAL / f)]
    if stale:
        note("plugin", f"payload drift: {', '.join(stale)}")
    else:
        ok("plugin", "payload matches canonical (SKILL.md per-home, not compared)")
    return stale


def check_hub():
    can = css_tokens((CANONICAL / "colors_and_type.css").read_text(encoding="utf-8"))
    git(HUB_REPO, "fetch", "origin", "--quiet")
    hub = css_tokens((at_main(HUB_REPO, HUB_CSS_REL) or b"").decode("utf-8"))
    missing = sorted(set(can) - set(hub))
    changed = sorted(k for k in set(can) & set(hub) if can[k].strip() != hub[k].strip())
    if missing or changed:
        parts = []
        if missing:
            parts.append(f"missing tokens: {', '.join(missing)}")
        if changed:
            parts.append(f"value drift: {', '.join(changed)}")
        note("hub (report-only)", "; ".join(parts) + " — sync Design/colors_and_type.css by hand, keep its /fonts/fonts.css import")
    else:
        ok("hub", "token values match (fonts import fork is expected)")


def apply_all(push: bool):
    # 1. canonical: push if ahead
    if dirty_payload(CANONICAL):
        sys.exit("ABORT: canonical has uncommitted payload changes — commit or stash first.")
    git(CANONICAL, "fetch", "origin", "--quiet")
    behind, ahead = git(CANONICAL, "rev-list", "--left-right", "--count",
                        "origin/main...main").stdout.split()
    if behind != "0":
        sys.exit("ABORT: canonical is behind origin/main — pull first.")
    if ahead != "0" and push:
        git(CANONICAL, "push", "origin", "main")
        print("pushed canonical")

    # 2. live skill: move the submodule to canonical, bump the seat pointer
    if dirty(LIVE):
        sys.exit("ABORT: live-skill working tree dirty — resolve by hand (git -C "
                 f"{LIVE} status).")
    git(LIVE, "fetch", "origin", "--quiet")
    git(LIVE, "checkout", "--quiet", "--detach", sha(CANONICAL))
    print(f"live-skill at {sha(LIVE)[:7]}")
    if LIVE_REL in dirty(SEAT):
        git(SEAT, "add", LIVE_REL)
        git(SEAT, "commit", "-m",
            f"chore(skills): bump 626labs-design to {sha(LIVE)[:7]}")
        if push:
            git(SEAT, "push")
        print("seat pointer bumped" + ("" if push else " [not pushed]"))
    else:
        print("seat pointer already current")

    # 3. plugin: copy payload, bump patch on change
    stale = check_plugin()
    branch = git(PLUGIN_REPO, "rev-parse", "--abbrev-ref", "HEAD").stdout.strip()
    if stale and (branch != "main" or dirty_tracked(PLUGIN_REPO)):
        sys.exit(f"ABORT: the plugin checkout is on '{branch}' (or has tracked changes); "
                 "sync it from a worktree on origin/main, or check out main first.")
    if stale:
        for f in stale:
            dest = PLUGIN_SKILL / f
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes((CANONICAL / f).read_bytes())
        manifest = json.loads(PLUGIN_MANIFEST.read_text(encoding="utf-8"))
        major, minor, patch = manifest["version"].split(".")
        manifest["version"] = f"{major}.{minor}.{int(patch) + 1}"
        PLUGIN_MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
                                   encoding="utf-8")
        git(PLUGIN_REPO, "add", *[str(Path("plugins/626labs/skills/design") / f) for f in stale],
            "plugins/626labs/.claude-plugin/plugin.json")
        git(PLUGIN_REPO, "commit", "-m",
            f"chore(design-skill): sync from 626labs-design {sha(CANONICAL)[:7]} "
            f"({manifest['version']})")
        if push:
            git(PLUGIN_REPO, "push", "origin", "main")
        print(f"plugin synced ({len(stale)} files) -> {manifest['version']}"
              + ("" if push else " [not pushed]"))
    else:
        print("plugin already in sync")

    # 4. hub: report only
    check_hub()


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true", help="propagate instead of just reporting")
    ap.add_argument("--check", action="store_true", help="report drift (default)")
    ap.add_argument("--no-push", action="store_true", help="with --apply: skip all git pushes")
    args = ap.parse_args()

    for p in (CANONICAL, LIVE, PLUGIN_SKILL, HUB_CSS):
        if not p.exists():
            sys.exit(f"ABORT: expected home missing: {p}")

    if args.apply:
        apply_all(push=not args.no_push)
        print("APPLY COMPLETE")
        return

    print("checking homes against canonical...")
    check_canonical()
    check_live()
    check_plugin()
    check_hub()
    if drift:
        print(f"\n{len(drift)} drift item(s). Run with --apply to propagate.")
        sys.exit(1)
    print("\nall homes in sync")


if __name__ == "__main__":
    main()
