test:
	NODE_OPTIONS=--experimental-vm-modules npm test --

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

install-local:
	npm link --force

publish:
	npm publish --dry-run

install:
	npm ci

gendiff-help:
	node bin/gendiff.js -h

gendiff:
	node bin/gendiff.js
