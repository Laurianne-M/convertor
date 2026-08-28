.PHONY: build

lint:
	npx eslint --ext .js,.ts .

build:
	npx tsc

build-watch:
	npx tsc --watch

serve: build
	npx firebase emulators:start --only functions

start: build
	npx firebase functions:shell

install:
	npm ci
	npm install -g firebase-tools

test:
	npx vitest

deploy:
	@if [ -z "$(FIREBASE_TOKEN)" ]; then \
		echo "Error: FIREBASE_TOKEN is not set."; \
		exit 1; \
	fi
	FIREBASE_TOKEN=$(FIREBASE_TOKEN) npx firebase deploy --only functions

logs:
	npx firebase functions:log
