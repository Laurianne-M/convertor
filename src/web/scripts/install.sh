#!/bin/bash
set -e
set -x

npm ci

if [ "$GITHUB_ACTIONS" != "true" ]; then
  npx playwright install-deps
else
  echo "Running in GitHub Actions, skipping Playwright dependency installation."
fi

npx playwright install
