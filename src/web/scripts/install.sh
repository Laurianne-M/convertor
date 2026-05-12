#!/bin/bash
set -e
set -x

npm ci
npx playwright install
