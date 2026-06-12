FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/

RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js (standalone output enabled in next.config.ts)
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build

# Pre-create the database during build
RUN mkdir -p /app/db && \
    DATABASE_URL="file:/app/db/custom.db" npx prisma db push --accept-data-loss && \
    node db-setup.cjs

# Production image - copy only necessary files from standalone output
FROM base AS runner
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone server output (includes only needed node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy pre-created database with seeded data
COPY --from=builder --chown=nextjs:nodejs /app/db ./db

# Ensure upload directory exists
RUN mkdir -p public/uploads/properties && \
    chown -R nextjs:nodejs db public/uploads

USER nextjs

EXPOSE 3000

# Set DATABASE_URL to the pre-created database
ENV DATABASE_URL="file:/app/db/custom.db"

CMD ["node", "server.js"]
