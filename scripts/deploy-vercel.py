#!/usr/bin/env python3
"""Deploy KopdesKu ke Vercel via file upload (tanpa Git integration)."""
import os, sys, json, hashlib, subprocess, urllib.request, urllib.error

TOKEN = os.environ["VERCEL_TOKEN"]
PROJECT = os.environ["VERCEL_PROJECT_ID"]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = "Mozilla/5.0"

EXCLUDE_DIRS = {"node_modules", ".next", ".git", ".vercel", "scripts"}
EXCLUDE_FILES_PREFIX = (".env",)


def list_files():
    # Pakai git ls-files biar ikut .gitignore + tambahkan untracked yang perlu
    out = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard"],
        cwd=ROOT, capture_output=True, text=True,
    ).stdout.splitlines()
    files = []
    for rel in out:
        if not rel:
            continue
        top = rel.split("/")[0]
        if top in EXCLUDE_DIRS:
            continue
        if os.path.basename(rel).startswith(EXCLUDE_FILES_PREFIX):
            continue
        full = os.path.join(ROOT, rel)
        if os.path.isfile(full):
            files.append(rel)
    return files


def upload(rel):
    full = os.path.join(ROOT, rel)
    data = open(full, "rb").read()
    sha = hashlib.sha1(data).hexdigest()
    req = urllib.request.Request(
        "https://api.vercel.com/v2/files",
        data=data, method="POST",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/octet-stream",
            "x-vercel-digest": sha,
            "User-Agent": UA,
        },
    )
    try:
        urllib.request.urlopen(req, timeout=60).read()
    except urllib.error.HTTPError as e:
        print(f"UPLOAD FAIL {rel}: {e.code} {e.read().decode()[:200]}")
        raise
    return {"file": rel, "sha": sha, "size": len(data)}


def main():
    files = list_files()
    print(f"Total file: {len(files)}")
    manifest = []
    for i, rel in enumerate(files, 1):
        manifest.append(upload(rel))
        if i % 10 == 0 or i == len(files):
            print(f"  uploaded {i}/{len(files)}")
    body = {
        "name": "kopdesku",
        "project": PROJECT,
        "target": "production",
        "files": [{"file": m["file"], "sha": m["sha"], "size": m["size"]} for m in manifest],
        "projectSettings": {"framework": "nextjs"},
    }
    req = urllib.request.Request(
        "https://api.vercel.com/v13/deployments",
        data=json.dumps(body).encode(), method="POST",
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": "application/json",
            "User-Agent": UA,
        },
    )
    try:
        resp = json.load(urllib.request.urlopen(req, timeout=60))
    except urllib.error.HTTPError as e:
        print(f"DEPLOY FAIL: {e.code} {e.read().decode()[:500]}")
        sys.exit(1)
    print("DEPLOY_ID:", resp.get("id"))
    print("DEPLOY_URL:", resp.get("url"))
    print("STATE:", resp.get("readyState") or resp.get("status"))


if __name__ == "__main__":
    main()
