#!/bin/sh
# Start script for Timeweb Cloud App deployment
# Assembles DATABASE_URL and starts Next.js immediately
# Database initialization happens inside Next.js via instrumentation.ts

echo "========================================="
echo "[start] Aktiv Plus — Starting"
echo "========================================="

# Ensure binding to all interfaces (required by PaaS)
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export PORT=${PORT:-3000}

# If DATABASE_URL is not set, build it from Timeweb PostgreSQL variables
if [ -z "$DATABASE_URL" ]; then
  if [ -n "$POSTGRESQL_HOST" ]; then
    export DATABASE_URL="postgresql://${POSTGRESQL_USER}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/${POSTGRESQL_DBNAME}"
    echo "[start] DATABASE_URL assembled from POSTGRESQL_* variables"
  else
    echo "[start] WARNING: Neither DATABASE_URL nor POSTGRESQL_* variables are set!"
    echo "[start] App will start but database features will not work"
  fi
else
  echo "[start] DATABASE_URL is already set"
fi

# Start Next.js server IMMEDIATELY
# Database migrations and seeding happen inside the app via instrumentation.ts
echo "[start] Starting Next.js server on ${HOSTNAME}:${PORT}..."
exec npx next start -p $PORT -H $HOSTNAME
