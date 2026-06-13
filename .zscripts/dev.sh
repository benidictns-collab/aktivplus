#!/bin/bash
set -e

cd /home/z/my-project

# Ensure environment variables are set
export DATABASE_URL="file:./prisma/data.db"
export NODE_OPTIONS="--max-old-space-size=2048"

echo "[dev.sh] Starting Aktiv Plus real estate application..."

# Install dependencies if needed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
  echo "[dev.sh] Installing dependencies..."
  bun install 2>/dev/null || npm install 2>/dev/null || true
fi

# Generate Prisma client
echo "[dev.sh] Generating Prisma client..."
npx prisma generate 2>/dev/null || true

# Setup database
echo "[dev.sh] Setting up database..."
npx prisma db push --accept-data-loss 2>/dev/null || true

# Check if we need to seed
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.count().then(c => {
  if (c === 0) {
    console.log('[dev.sh] Seeding database...');
    const { execSync } = require('child_process');
    try { execSync('npx tsx prisma/seed.ts', { stdio: 'pipe', timeout: 30000 }); } catch(e) { console.error('[dev.sh] Seed error:', e.message); }
  } else {
    console.log('[dev.sh] Database has ' + c + ' users, skipping seed');
  }
  prisma.\$disconnect();
}).catch(e => {
  console.error('[dev.sh] DB check error:', e.message);
  prisma.\$disconnect();
});
" 2>/dev/null || true

# Build the project for production (more stable and memory-efficient than dev server)
echo "[dev.sh] Building Next.js project..."
npx next build 2>&1 || {
  echo "[dev.sh] Build failed, trying dev server as fallback..."
  exec npx next dev -p 3000
}

# Start the production server using double-fork for reliable background process
echo "[dev.sh] Starting Next.js production server on port 3000..."
(
  nohup node node_modules/.bin/next start -p 3000 > /tmp/next-server.log 2>&1 &
  echo $! > /tmp/next-server.pid
) &

# Wait for server to be ready
echo "[dev.sh] Waiting for server to start..."
for i in $(seq 1 30); do
  if ss -tlnp 2>/dev/null | grep -q 3000; then
    echo "[dev.sh] Server is ready on port 3000!"
    break
  fi
  if [ $i -eq 30 ]; then
    echo "[dev.sh] WARNING: Server failed to start within 30 seconds"
  fi
  sleep 1
done

# Keep the script running (don't exit, as that might kill the server)
echo "[dev.sh] Server started. Keeping script alive..."
wait
