#!/bin/bash
set -e
set -x

npm ci
npm install -g firebase-tools