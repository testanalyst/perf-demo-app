# Build stage
FROM node:18.19.1-alpine3.18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Runtime stage
FROM node:18.19.1-alpine3.18

# Set environment variables
ENV NODE_ENV=production \
    PORT=3000

# Create app directory and set ownership
WORKDIR /app

# Install security updates and create non-root user if doesn't exist
RUN apk --no-cache upgrade && \
    apk add --no-cache dumb-init && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Copy only necessary files from builder stage
COPY --from=builder --chown=appuser:appgroup /app/package.json ./
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/src ./src
COPY --from=builder --chown=appuser:appgroup /app/railway.json ./
COPY --from=builder --chown=appuser:appgroup /app/Procfile ./

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Use dumb-init as entrypoint to handle signals properly
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["node", "src/server.js"] 