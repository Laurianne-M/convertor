#!/usr/bin/env bash
set -euo pipefail

STATUSES="$1"

if echo "$STATUSES" | grep -E "failure|cancelled"; then
  echo "Checks failed."
  exit 1
fi

echo "Checks passed or were safely skipped."