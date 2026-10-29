.PHONY: build

SERVE_PORT ?= 5174
E2E_REPORT_HOST ?= 0.0.0.0
E2E_REPORT_PORT ?= 9323	

BUILD_MODE ?= prod
ENV_FILE = ../../.env.$(BUILD_MODE)

validate-env:
	npx tsx --env-file=$(ENV_FILE) scripts/validate-env.ts path=$(ENV_FILE) VITE_API_URL=url VITE_EXCHANGE_RATES_API_KEY=string

lint:
	npx eslint .

build: validate-env
	npx vite build --mode $(BUILD_MODE)

start: validate-env
	npx vite --port $(SERVE_PORT) --host --mode dev

serve: build
	npx serve build --listen $(SERVE_PORT)

serve-e2e: BUILD_MODE = test
serve-e2e: serve

test-unit: BUILD_MODE = test
test-unit: validate-env
	npx vitest

test-ui: BUILD_MODE = test
test-ui: validate-env
	npx vitest --ui

test-coverage: BUILD_MODE = test
test-coverage: validate-env
	npx vitest run --coverage

test-e2e: BUILD_MODE = test
test-e2e: validate-env
	npx playwright test

report-e2e:
	npx playwright show-report playwright-report --host $(E2E_REPORT_HOST) --port $(E2E_REPORT_PORT)

install:
	npm ci
	npm install -g firebase-tools
	@if [ "$$GITHUB_ACTIONS" != "true" ]; then \
		npx playwright install-deps; \
	else \
		echo "Running in GitHub Actions, skipping Playwright dependency installation."; \
	fi
	npx playwright install
