# Project 2 "Compute Differences of files"

Frontend Developer on Hexlet.

https://ru.hexlet.io/programs/frontend/projects/46

## About

CLI utility for comparing difference of two files and format diff.
Publishing only locally (not in npm).
Usage as package and module as well.

---
### Hexlet tests and linter status

[![Actions Status](https://github.com/ivekhov/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ivekhov/frontend-project-46/actions)

### GitHub Actions

[![Actions Status](https://github.com/ivekhov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ivekhov/frontend-project-46/actions)

### CodeClimate: Code Coverage

[![Maintainability](https://api.codeclimate.com/v1/badges/f9b0debda75ad31a2506/maintainability)](https://codeclimate.com/github/ivekhov/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/f9b0debda75ad31a2506/test_coverage)](https://codeclimate.com/github/ivekhov/frontend-project-46/test_coverage)


---
## How it works 
Asciinema: https://asciinema.org/a/LtmkA9A1ztfdFbl0W51Wp5NC8

[![asciicast](https://asciinema.org/a/LtmkA9A1ztfdFbl0W51Wp5NC8.svg)](https://asciinema.org/a/LtmkA9A1ztfdFbl0W51Wp5NC8)


## Setup local

```bash
make install-local

gendiff -h
```

## Usage example

```js
import { gendiff } from '@hexlet/gendiff';
```

## Run tests

```bash
make test

# example of usage
gendiff  __fixtures__/file01.json __fixtures__/file02.json
```

## Development

Once when developing:

```bash
# add in package.json
"bin": {
  "gendiff": "bin/gendiff.js"
}, 

chmod +x bin/gendiff.js
```

After changing code:

```bash
make test

make lint

make install-local

make publish

make gendiff-help
```

ToDo:


- fix tests of cli utility
  - test from or?
    - `NODE_OPTIONS=--experimental-vm-modules npx jest` (now)
    - `npm test`
- fix actions on github
- Eslint warning on js extension when import module ? 
- ESLint: Unexpected use of file extension "js" for "../src/gendiff.js"(import/extensions

----
----
