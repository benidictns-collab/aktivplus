FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* yarn.lock* bun.lock* ./
COPY prisma ./prisma/

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f bun.lock ]; then npm install; \
  else npm install; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_OPTIONS=--max-old-space-size=4096

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/production-server.cjs ./production-server.cjs
COPY --from=builder /app/db-setup.cjs ./db-setup.cjs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create necessary directories with write permissions
RUN mkdir -p db public/uploads/properties && \
    chown -R nextjs:nodejs db public/uploads .next

# Run database setup before starting
RUN node db-setup.cjs

USER nextjs

EXPOSE 3000

CMD ["node", "production-server.cjs"]
