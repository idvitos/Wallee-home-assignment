# Use official Playwright image with all dependencies installed
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Set working directory
WORKDIR /usr/src/app

# Copy package and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files
COPY . .

# Run Playwright install (to ensure all browsers are present)
RUN npx playwright install --with-deps

# Default command
CMD ["npx", "playwright", "test"]
