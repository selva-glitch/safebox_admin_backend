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

# Copy package files and env
COPY package*.json ./
COPY .env ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy necessary files
COPY tsconfig.json ./

# Expose NestJS port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

RUN apk add --no-cache mysql-client

# Start application
CMD ["npm", "run", "start:prod"]
