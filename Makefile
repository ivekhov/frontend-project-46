test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

install:
	npm ci

install-local:
	npm link

gendiff-help:
	node bin/gendiff.js -h

gendiff:
	node bin/gendiff.js
