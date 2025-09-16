# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .env ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy necessary files
COPY tsconfig.json ./

# Expose the port (typical for NestJS applications)
EXPOSE 3000

# Set NODE_ENV
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "start:prod"]
