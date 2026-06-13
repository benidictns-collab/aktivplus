#!/bin/sh
# Start script for Timeweb Cloud App deployment
# Assembles DATABASE_URL with proper URL encoding and starts Next.js

echo "========================================="
echo "[start] Aktiv Plus — Starting"
echo "========================================="

# CRITICAL: Force bind to all interfaces
# In PaaS containers, HOSTNAME is pre-set to the container ID,
# so we MUST force it to 0.0.0.0 — do NOT use ${HOSTNAME:-0.0.0.0}
export HOSTNAME=0.0.0.0
export PORT=${PORT:-3000}

echo "[start] Will listen on ${HOSTNAME}:${PORT}"

# If DATABASE_URL is not set, build it from Timeweb PostgreSQL variables
if [ -z "$DATABASE_URL" ]; then
  if [ -n "$POSTGRESQL_HOST" ]; then
    # RFC 3986 URL-encode username and password using Node.js
    # Handles special chars like =!()*@# etc. in PostgreSQL passwords
    ENCODED_USER=$(node -e "
      const s=process.argv[1];
      console.log(s.replace(/[^A-Za-z0-9]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')));
    " "$POSTGRESQL_USER")
    ENCODED_PASS=$(node -e "
      const s=process.argv[1];
      console.log(s.replace(/[^A-Za-z0-9]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')));
    " "$POSTGRESQL_PASSWORD")

    export DATABASE_URL="postgresql://${ENCODED_USER}:${ENCODED_PASS}@${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/${POSTGRESQL_DBNAME}"
    echo "[start] DATABASE_URL assembled from POSTGRESQL_* variables"
    echo "[start] Database host: ${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/${POSTGRESQL_DBNAME}"
  else
    echo "[start] WARNING: Neither DATABASE_URL nor POSTGRESQL_* variables are set!"
    echo "[start] App will start but database features will not work"
  fi
else
  echo "[start] DATABASE_URL is already set"
fi

# Start Next.js server IMMEDIATELY using direct binary
# Database initialization (prisma db push + seed) happens inside the app
# via instrumentation.ts → db-init.ts (runs in background, non-blocking)
echo "[start] Starting Next.js server..."
exec ./node_modules/.bin/next start -p "$PORT" -H "$HOSTNAME"
