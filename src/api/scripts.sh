#!/bin/bash

set -e
set -x

function serve() {
  npm run build
  firebase emulators:start --only functions
}

function start() {
  npm run shell
}

function build() {
  npm run build
}

function install() {
  npm ci
  npm install -g firebase-tools
}

function test() {
  npm run test
}

function deploy() {
  npm run deploy
}

"$@"