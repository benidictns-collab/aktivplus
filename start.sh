#!/bin/sh
# Start script for Timeweb Cloud App deployment
# Assembles DATABASE_URL from separate PostgreSQL env vars and starts the app

set -e

echo "========================================="
echo "[start] Aktiv Plus — Starting deployment"
echo "========================================="

# Ensure HOSTNAME is set for binding to all interfaces (required by PaaS)
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export PORT=${PORT:-3000}

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

echo "[start] DATABASE_URL points to host: $(echo $DATABASE_URL | sed 's/.*@\([^:\/]*\).*/\1/')"

# Apply Prisma migrations (don't fail the whole script if this errors)
echo "[start] Running prisma migrate deploy..."
npx prisma migrate deploy 2>&1 || {
  echo "[start] WARNING: prisma migrate deploy failed, trying prisma db push..."
  npx prisma db push --accept-data-loss 2>&1 || {
    echo "[start] WARNING: prisma db push also failed, continuing anyway..."
  }
}

# Seed database if empty (idempotent — seed script checks for existing data)
echo "[start] Running prisma db seed..."
npx prisma db seed 2>&1 || echo "[start] Seed skipped or already seeded"

# Copy static assets for standalone mode
echo "[start] Preparing standalone server..."
if [ -d ".next/standalone" ]; then
  # Copy static files that standalone server needs
  cp -r .next/static .next/standalone/.next/static 2>/dev/null || true
  cp -r public .next/standalone/public 2>/dev/null || true
  # Copy prisma schema for runtime
  cp -r prisma .next/standalone/prisma 2>/dev/null || true

  echo "[start] Starting Next.js standalone server on ${HOSTNAME}:${PORT}..."
  cd .next/standalone
  exec node server.js
else
  echo "[start] No standalone build found, falling back to next start..."
  exec npx next start -p $PORT -H $HOSTNAME
fi
