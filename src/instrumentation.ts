export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[instrumentation] Server starting...');

    // Ensure DATABASE_URL is set for PostgreSQL
    if (!process.env.DATABASE_URL) {
      console.error('[instrumentation] ERROR: DATABASE_URL environment variable is not set!');
      console.error('[instrumentation] Please set DATABASE_URL to your PostgreSQL connection string.');
      console.error('[instrumentation] Example: postgresql://user:password@host:5432/dbname');
    } else {
      console.log('[instrumentation] DATABASE_URL is configured');
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
