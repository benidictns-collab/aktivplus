export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[instrumentation] Server starting...');

    if (!process.env.DATABASE_URL) {
      console.error('[instrumentation] DATABASE_URL is not set. Database features will not work.');
    } else {
      console.log('[instrumentation] DATABASE_URL is configured');
      // Initialize database in the background — don't block server startup
      // The server needs to start quickly for health checks to pass
      import('@/lib/db-init')
        .then(({ initDatabase }) => initDatabase())
        .then(() => console.log('[instrumentation] Database initialized successfully'))
        .catch((error) => console.error('[instrumentation] Database initialization failed:', error.message));
    }
  }
}
