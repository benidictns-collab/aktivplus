#!/bin/sh
# Start script for Timeweb Cloud App deployment
# Assembles DATABASE_URL from separate PostgreSQL env vars and starts the app

# If DATABASE_URL is not set, build it from individual Timeweb PostgreSQL variables
if [ -z "$DATABASE_URL" ]; then
  if [ -n "$POSTGRESQL_HOST" ]; then
    export DATABASE_URL="postgresql://${POSTGRESQL_USER}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/${POSTGRESQL_DBNAME}"
    echo "[start] DATABASE_URL assembled from POSTGRESQL_* variables"
  else
    echo "[start] ERROR: Neither DATABASE_URL nor POSTGRESQL_* variables are set!"
    exit 1
  fi
else
  echo "[start] DATABASE_URL is already set"
fi

# Apply Prisma migrations
echo "[start] Running prisma migrate deploy..."
npx prisma migrate deploy

# Seed database if empty (idempotent — checks for existing data)
echo "[start] Running prisma db seed..."
npx prisma db seed || echo "[start] Seed skipped or already seeded"

# Start the Next.js standalone server
echo "[start] Starting Next.js server on port ${PORT:-3000}..."
exec node .next/standalone/server.js
