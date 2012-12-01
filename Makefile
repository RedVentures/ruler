REPORTER = spec
TESTS = $(wildcard test/*.test.js)

components:
	@component install --dev

build: components
	@component build

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) \
		--require "should" \
		--growl \
		--reporter $(REPORTER)

.PHONY: test