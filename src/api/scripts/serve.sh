#!/bin/bash
set -e
set -x

npm run build && firebase emulators:start --only functions