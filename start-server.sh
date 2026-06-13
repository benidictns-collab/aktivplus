#!/bin/bash
cd /home/z/my-project
export NODE_OPTIONS="--max-old-space-size=2048"
export DATABASE_URL="file:./prisma/data.db"
exec npx next start -p 3000
