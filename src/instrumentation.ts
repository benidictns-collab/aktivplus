export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[instrumentation] Server starting...');

    if (!process.env.DATABASE_URL) {
      console.warn('[instrumentation] DATABASE_URL is not set. Database features will not work.');
      return;
    }

    console.log('[instrumentation] DATABASE_URL is configured');

    // Initialize database in the background — do NOT await
    // The server must start ASAP to pass health checks
    import('@/lib/db-init')
      .then(({ initDatabase }) => initDatabase())
      .then(() => console.log('[instrumentation] Database initialized successfully'))
      .catch((error) => console.error('[instrumentation] Database init failed:', error.message));
  }
}
