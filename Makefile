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

test-cov: lib-cov
	@RULER_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

clean:
	rm -rf coverage.html node_modules components

.PHONY: test test-cov lib-cov