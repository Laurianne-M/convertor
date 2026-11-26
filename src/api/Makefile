.PHONY: build

ENV_FILE = ./.env

generate-env:
	echo "EXCHANGE_RATES_API_KEY=$(EXCHANGE_RATES_API_KEY)" >> $(ENV_FILE)

validate-env:
	npx tsx --env-file=$(ENV_FILE) ../shared/scripts/validate-env.ts path=$(ENV_FILE) EXCHANGE_RATES_API_KEY=string

lint:
	npx eslint --ext .js,.ts .

build: validate-env
	npx tsc

build-watch: validate-env
	npx tsc --watch

serve: build
	npx firebase --config ../../firebase.json emulators:start --only functions,firestore

start: build
	npx firebase functions:shell

install:
	npm ci
	npm install -g firebase-tools

test: BUILD_MODE = test
test: validate-env
	npx vitest

predeploy: lint build

deploy:
	@if [ -z "$(FIREBASE_TOKEN)" ]; then \
		echo "Error: FIREBASE_TOKEN is not set."; \
		exit 1; \
	fi
	FIREBASE_TOKEN=$(FIREBASE_TOKEN) npx firebase deploy --only functions,firestore

logs:
	npx firebase functions:log
