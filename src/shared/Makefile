.PHONY: validate-env

BUILD_MODE ?= prod
ENV_FILE = ../../.env.$(BUILD_MODE)

validate-env:
	npx tsx --env-file=$(ENV_FILE) scripts/validate-env.ts path=$(ENV_FILE) VITE_API_URL=url VITE_EXCHANGE_RATES_API_KEY=string

test-unit: BUILD_MODE = test
test-unit: validate-env
	npx vitest