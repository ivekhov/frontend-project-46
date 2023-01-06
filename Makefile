test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	#npm test -- --coverage --coverageProvider=v8
	#npx jest --coverage NODE_OPTIONS=--experimental-vm-modules
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

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
