#!/bin/bash
# Auto-deploy trigger — run after git push
# Usage: ./scripts/auto-deploy.sh

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

# Check if deploy.py exists
if [ ! -f "scripts/deploy.py" ]; then
    echo "❌ deploy.py not found"
    exit 1
fi

# Run deploy
echo "🚀 Auto-deploying via Composio..."
python3 scripts/deploy.py
