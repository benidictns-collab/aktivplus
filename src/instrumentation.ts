export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[instrumentation] Server starting...');

    // Ensure DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'file:./prisma/data.db';
      console.log('[instrumentation] DATABASE_URL set to:', process.env.DATABASE_URL);
    }

    try {
      // Dynamic import to avoid bundling issues
      const { initDatabase } = await import('@/lib/db-init');
      await initDatabase();
      console.log('[instrumentation] Database initialized successfully');
    } catch (error) {
      console.error('[instrumentation] Database initialization failed:', (error as Error).message);
      // Don't crash — the app can still serve static content
      // API routes will fail gracefully until DB is available
    }
  }
}
