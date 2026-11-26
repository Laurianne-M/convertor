.PHONY: build

BUILD_MODE ?= prod
ENV_FILE = ./.env
ENV_FILE_V2 = ./.env.$(BUILD_MODE)

generate-env-v1:
	rm -f $(ENV_FILE)
	echo "EXCHANGE_RATES_API_KEY=$(EXCHANGE_RATES_API_KEY)" >> $(ENV_FILE)
	echo "EXCHANGE_RATES_API_URL=$(EXCHANGE_RATES_API_URL)" >> $(ENV_FILE)

validate-env-v1: generate-env-v1
	npx tsx --env-file=$(ENV_FILE) ../shared/scripts/validate-env.ts path=$(ENV_FILE) EXCHANGE_RATES_API_KEY=string EXCHANGE_RATES_API_URL=url

# TODO - Delete versioning once the new env configuration is fully adopted
generate-env-v2:
	rm -f $(ENV_FILE_V2)
	echo "EXCHANGE_RATES_API_KEY=$(EXCHANGE_RATES_API_KEY)" >> $(ENV_FILE_V2)
	echo "EXCHANGE_RATES_API_URL=$(EXCHANGE_RATES_API_URL)" >> $(ENV_FILE_V2)

validate-env-v2: generate-env-v2
	npx tsx --env-file=$(ENV_FILE_V2) ../shared/scripts/validate-env.ts path=$(ENV_FILE_V2) EXCHANGE_RATES_API_KEY=string EXCHANGE_RATES_API_URL=url

generate-env: generate-env-v1 generate-env-v2

validate-env: validate-env-v1 validate-env-v2

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

install-firebase:
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
