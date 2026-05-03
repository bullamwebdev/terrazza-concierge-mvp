# 🚀 WiseGenerative Vercel Deploy Pipeline (Composio)

**Problem solved**: GitHub Actions was failing (bad secrets). This script deploys directly via Composio's Vercel integration.

## Quick Start

```bash
# Deploy to production (from main branch)
python3 scripts/deploy.py

# Deploy to staging
python3 scripts/deploy.py --staging

# Check a specific deployment status
python3 scripts/deploy.py --status dpl_xxx
```

## How It Works

1. **Composio** is already authenticated with your Vercel account
2. `deploy.py` calls `VERCEL_CREATE_NEW_DEPLOYMENT` with:
   - `gitSource` → GitHub repo `bullamwebdev/terrazza-concierge-mvp`
   - `ref` → `main` branch
   - `project` → `prj_EqISYd2q8dqHnhZkau7mPgYvHIBV`
   - `target` → `production` or `staging`
3. Polls `VERCEL_GET_DEPLOYMENT` until `readyState=READY`
4. Reports live URL

## Requirements

- `~/.composio/composio` CLI (already installed & connected)
- Python 3 (system default)
- No Vercel token needed — Composio handles auth

## Project Details

| Key | Value |
|-----|-------|
| Project Name | `terrazza-concierge-mvp` |
| Project ID | `prj_EqISYd2q8dqHnhZkau7mPgYvHIBV` |
| Repo | `bullamwebdev/terrazza-concierge-mvp` |
| Repo ID | `1227545108` |
| Branch | `main` |
| Live URL | `https://terrazza-concierge-mvp.vercel.app` |

## Troubleshooting

- **Composio not found**: Check `~/.composio/composio --version`
- **Deploy fails**: Run with `--status <deploy_id>` to diagnose
- **Stuck polling**: Check Vercel dashboard directly
