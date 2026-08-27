.PHONY: build

build:
	npx vite build

start:
	npx vite --port 5174 --host

serve:
	npx serve build --listen 5174

prod: build
	npx serve build --listen 5174

test:
	npx vitest

test-run:
	npx vitest run

test-ui:
	npx vitest --ui

test-coverage:
	npx vitest run --coverage

test-e2e:
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
