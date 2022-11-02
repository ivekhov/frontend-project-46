# Project 2 "Compute Differences of files"

Frontend Developer on Hexlet.

## Steps

```bash
# once:

# add in package.json
"bin": {
  "gendiff": "bin/gendiff.js"
}, 

chmod +x bin/gendiff.js


# after changing code:

make lint

make publish

npm link


gendiff -h

# or
bin/gendiff.js -h
# or
make gendiff -h

# usage
bin/gendiff.js __tests__/__fixtures__/file01.json __tests__/__fixtures__/file02.json

bin/gendiff.js __tests__/__fixtures__/file03.yml __tests__/__fixtures__/file04.yml

```
ToDo:
- recursion task #06
- fix tests of cli utility 
- fix make calls
- fix actions


### Hexlet tests and linter status:
[![Actions Status](https://github.com/ivekhov/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ivekhov/frontend-project-46/actions)

### GitHub Actions

[![Actions Status](https://github.com/ivekhov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ivekhov/frontend-project-46/actions)


### CodeClimate: Code Coverage
[![Maintainability](https://api.codeclimate.com/v1/badges/f9b0debda75ad31a2506/maintainability)](https://codeclimate.com/github/ivekhov/frontend-project-46/maintainability)


[![Test Coverage](https://api.codeclimate.com/v1/badges/f9b0debda75ad31a2506/test_coverage)](https://codeclimate.com/github/ivekhov/frontend-project-46/test_coverage)

