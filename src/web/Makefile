.PHONY: build

BUILD_MODE ?= prod

validate:
	npx tsx --env-file=../../.env.$(BUILD_MODE) scripts/validate-env.ts

lint:
	npx eslint .

build: validate
	npx vite build --mode $(BUILD_MODE)

start: validate
	npx vite --port 5174 --host --mode dev

serve:
	npx serve build --listen 5174

prod: build
	npx serve build --listen 5174

test-unit: validate
	npx vitest

test-run: validate
	npx vitest run

test-ui: validate
	npx vitest --ui

test-coverage: validate
	npx vitest run --coverage

test-e2e: validate
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
