export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[instrumentation] Initializing database...');
    try {
      const { initDatabase } = await import('@/lib/db-init');
      await initDatabase();
      console.log('[instrumentation] Database ready');
    } catch (err) {
      console.error('[instrumentation] Database init failed:', err);
      // Don't crash - the app can still serve static pages
    }
  }
}
