export async function register() {
  // Only run on server side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[instrumentation] Server starting...');
    // Database initialization is handled by production-server.cjs before Next.js starts.
    // No need to run it again here.
  }
}
