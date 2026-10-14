.PHONY: build

BUILD_MODE ?= prod
ENV_FILE = ../../.env.$(BUILD_MODE)

validate-env:
	@if [ -f "$(ENV_FILE)" ]; then \
		npx tsx --env-file=$(ENV_FILE) scripts/validate-env.ts; \
	else \
		npx tsx scripts/validate-env.ts; \
	fi

lint:
	npx eslint .

build: validate-env
	npx vite build --mode $(BUILD_MODE)

start: validate-env
	npx vite --port 5174 --host --mode dev

serve: build
	npx serve build --listen 5174

test-unit: BUILD_MODE = test
test-unit: validate-env
	npx vitest

test-run: BUILD_MODE = test
test-run: validate-env
	npx vitest run

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
	npx playwright show-report playwright-report --host 0.0.0.0 --port 9323

install:
	npm ci
	npm install -g firebase-tools
	@if [ "$$GITHUB_ACTIONS" != "true" ]; then \
		npx playwright install-deps; \
	else \
		echo "Running in GitHub Actions, skipping Playwright dependency installation."; \
	fi
	npx playwright install
