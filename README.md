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
bin/gendiff.js __tests__/fixtures/file01.json __tests__/fixtures/file02.json

bin/gendiff.js __tests__/fixtures/file03.yml __tests__/fixtures/file04.yml

// bin/gendiff.js /Users/ivan/work/frontend/projects/frontend-project-46/__tests__/fixtures/file01.json

// bin/gendiff.js /Users/ivan/work/frontend/projects/frontend-project-46/__tests__/fixtures/file01.json /Users/ivan/work/frontend/projects/frontend-project-46/__tests__/fixtures/file02.json


```

### Hexlet tests and linter status:
[![Actions Status](https://github.com/ivekhov/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ivekhov/frontend-project-46/actions)
