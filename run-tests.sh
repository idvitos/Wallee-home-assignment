#!/bin/bash

# Stop on error
set -e

# Build Docker image
docker build -t wallee-tests .

# Run tests
docker run --rm \
  --name wallee-tests-run \
  -v "$(pwd)/playwright-report:/usr/src/app/playwright-report" \
  -v "$(pwd)/test-results:/usr/src/app/test-results" \
  wallee-tests
