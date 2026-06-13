#!/bin/sh
# Start script for Timeweb Cloud App deployment
# Assembles DATABASE_URL from separate PostgreSQL env vars and starts the app

echo "========================================="
echo "[start] Aktiv Plus — Starting deployment"
echo "========================================="

# Ensure HOST and PORT are set for binding to all interfaces
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

echo "[start] Database host: $(echo $DATABASE_URL | sed 's/.*@\([^:\/]*\).*/\1/')"

# Apply Prisma migrations (continue even if it fails)
echo "[start] Running prisma migrate deploy..."
npx prisma migrate deploy 2>&1 || {
  echo "[start] WARNING: prisma migrate deploy failed, trying prisma db push..."
  npx prisma db push --accept-data-loss 2>&1 || {
    echo "[start] WARNING: prisma db push also failed, continuing anyway..."
  }
}

# Seed database if empty
echo "[start] Running prisma db seed..."
npx prisma db seed 2>&1 || echo "[start] Seed skipped or already seeded"

# Start Next.js server
echo "[start] Starting Next.js server on ${HOSTNAME}:${PORT}..."
exec npx next start -p $PORT -H $HOSTNAME
