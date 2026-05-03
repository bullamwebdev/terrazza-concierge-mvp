#!/usr/bin/env python3
"""
WiseGenerative Vercel Deployer — Persistent Composio pipeline

Usage:
  python3 deploy.py                    # Deploy from main branch (production)
  python3 deploy.py --staging          # Deploy to staging
  python3 deploy.py --status <id>      # Check deployment status

Requires: Composio CLI at ~/.composio/composio (already connected)
"""

import subprocess, json, re, sys, os, time, argparse

os.environ['TERM'] = 'dumb'

# ── CONFIG (persisted from your project) ─────────────────────────────
PROJECT_ID    = "prj_EqISYd2q8dqHnhZkau7mPgYvHIBV"
PROJECT_NAME  = "terrazza-concierge-mvp"
REPO_ID       = "1227545108"      # bullamwebdev/terrazza-concierge-mvp
BRANCH        = "main"
COMPOSIO_BIN  = os.path.expanduser("~/.composio/composio")
# ─────────────────────────────────────────────────────────────────────

ANSI_RE = re.compile(r'\x1b\[[0-9;]*m')

def strip_ansi(text):
    return ANSI_RE.sub('', text)

def parse_composio_json(raw_output):
    """Extract JSON from composio CLI output (handles ANSI + multi-line JSON)."""
    clean = strip_ansi(raw_output)
    # Try to find JSON — it may be multi-line
    # Look for the first '{' that starts a valid JSON object
    start = clean.find('{')
    if start == -1:
        return None
    # Try progressively larger slices
    for end in range(len(clean), start, -1):
        try:
            candidate = clean[start:end]
            # Must end with '}'
            candidate = candidate.rstrip()
            if candidate.endswith('}'):
                return json.loads(candidate)
        except json.JSONDecodeError:
            continue
    return None

def run_composio(tool_slug, payload_dict):
    """Execute a Composio tool and return parsed JSON."""
    cmd = [
        COMPOSIO_BIN, 'execute', tool_slug,
        '-d', json.dumps(payload_dict)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, env={**os.environ, 'TERM': 'dumb'})
    data = parse_composio_json(result.stdout)
    if not data:
        print(f"⚠️  Could not parse Composio output for {tool_slug}")
        print(f"   stdout: {result.stdout[:500]}")
        if result.stderr:
            print(f"   stderr: {result.stderr[:500]}")
        return None
    return data

def deploy(target="production"):
    print(f"🚀 Deploying {PROJECT_NAME} → {target} (branch: {BRANCH})")

    payload = {
        "name": PROJECT_NAME,
        "project": PROJECT_ID,
        "target": target,
        "forceNew": "1",
        "gitSource": {
            "type": "github",
            "repoId": REPO_ID,
            "ref": BRANCH
        }
    }

    result = run_composio("VERCEL_CREATE_NEW_DEPLOYMENT", payload)
    if not result or not result.get("successful"):
        print("❌ Deployment creation failed")
        print(json.dumps(result, indent=2) if result else "No response")
        sys.exit(1)

    deploy_data = result["data"]
    deploy_id = deploy_data["id"]
    url = deploy_data.get("url", "?")
    status = deploy_data.get("readyState", "UNKNOWN")

    print(f"\n✅ Deployment created: {deploy_id}")
    print(f"   Preview URL: https://{url}")
    print(f"   Initial status: {status}")

    # Poll until ready
    print(f"\n⏳ Polling for ready state...")
    for i in range(24):  # 2 minutes max
        time.sleep(5)
        status_result = run_composio("VERCEL_GET_DEPLOYMENT", {"idOrUrl": deploy_id})
        if not status_result or not status_result.get("data"):
            continue
        dd = status_result["data"]
        current = dd.get("readyState", "?")
        alias = dd.get("aliasAssigned", False)
        error = dd.get("errorCode")
        error_msg = dd.get("errorMessage", "")

        print(f"   [{i+1}] Status: {current} | Alias: {alias}", end="")
        if error:
            print(f" | ERROR: {error} — {error_msg}")
        else:
            print()

        if current in ("READY", "ERROR", "CANCELED"):
            if current == "READY" and alias:
                print(f"\n🎉 LIVE: https://terrazza-concierge-mvp.vercel.app")
                return True
            elif current == "READY":
                print(f"\n✅ Ready but alias pending: https://{url}")
                return True
            elif current == "ERROR":
                print(f"\n❌ Deployment failed: {error} — {error_msg}")
                return False

    print(f"\n⏱️  Timeout — check manually: https://vercel.com/bullamwebdevs-projects/{PROJECT_NAME}/{deploy_id}")
    return False

def check_status(deploy_id):
    print(f"🔍 Checking deployment: {deploy_id}")
    result = run_composio("VERCEL_GET_DEPLOYMENT", {"idOrUrl": deploy_id})
    if result and result.get("data"):
        dd = result["data"]
        print(f"   Status: {dd.get('readyState', '?')}")
        print(f"   URL: https://{dd.get('url', '?')}")
        print(f"   Alias assigned: {dd.get('aliasAssigned', False)}")
        if dd.get('errorCode'):
            print(f"   Error: {dd.get('errorCode')} — {dd.get('errorMessage', '?')}")
    else:
        print("❌ Could not fetch status")

def main():
    parser = argparse.ArgumentParser(description="WiseGenerative Vercel Deployer")
    parser.add_argument("--staging", action="store_true", help="Deploy to staging")
    parser.add_argument("--status", metavar="ID", help="Check deployment status by ID")
    args = parser.parse_args()

    if args.status:
        check_status(args.status)
    else:
        target = "staging" if args.staging else "production"
        success = deploy(target)
        sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
