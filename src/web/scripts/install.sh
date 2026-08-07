#!/bin/bash
set -e
set -x

npm ci
npm install -g firebase-tools

if [ "$GITHUB_ACTIONS" != "true" ]; then
  npx playwright install-deps
else
  echo "Running in GitHub Actions, skipping Playwright dependency installation."
fi

npx playwright install
