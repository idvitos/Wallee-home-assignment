![Build Status](https://github.com/idvitos/Wallee-home-assignment/actions/workflows/playwright-ci.yaml/badge.svg)

# Wallee Practical Task

This project implements automated UI tests for Wallee testing project using [Playwright](https://playwright.dev/).

# What is Covered?
    ✅ Sorting products (price ascending/descending)
    ✅ Cart operations (add/remove, quantity update)
    ✅ Checkout form and iframe-based payment
    ✅ My Account login with invalid credentials
    ✅ Coupon application and error validation
    ✅ Navigation between core pages (Shop, Cart, Checkout)

# Prerequisites
- Node.js (v18+)
- npm
- Docker (for containerized execution)

# Install Dependencies

- 'npm install'

# Install Browsers

- 'npx playwright install'

# Run All Tests Locally
- 'npm run test' - for running in headless mode
- 'npm run test:headed' - for running in headed mode

# Run Specific Test
- 'npx playwright test tests/cart.spec.ts' - for running in headless mode
- 'npx playwright test --headed checkout.spec.ts' - for running in headed mode

# Run Tests in Docker
- 'chmod +x run-tests.sh'
- './run-tests.sh' - for running tests (Docker need to be installed and running)

# Run With Test Coverage
- 'npm run test:coverage' - for running tests with coverage analysis
- 'open coverage/index.html' - for opening report in browser