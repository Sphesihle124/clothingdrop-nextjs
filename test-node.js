console.log('🚀 ClothingDrop - Starting Server...');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('');

// Kill any existing processes on port 3000
const { exec } = require('child_process');

console.log('🔧 Clearing port 3000...');
exec('netstat -ano | findstr :3000', (error, stdout, stderr) => {
  if (stdout) {
    const lines = stdout.split('\n');
    lines.forEach(line => {
      const match = line.match(/\s+(\d+)$/);
      if (match) {
        const pid = match[1];
        exec(`taskkill /PID ${pid} /F`, () => {});
      }
    });
  }

  // Wait a moment then start server
  setTimeout(startServer, 2000);
});

function startServer() {
  console.log('✅ Port cleared, starting Next.js...');

  try {
    const next = require('next');
    console.log('✅ Next.js loaded successfully');

    const app = next({
      dev: true,
      quiet: false,
      dir: process.cwd()
    });

    const handle = app.getRequestHandler();

    console.log('🔄 Preparing Next.js application...');

    app.prepare().then(() => {
      console.log('✅ Next.js prepared successfully');

      const { createServer } = require('http');
      const server = createServer((req, res) => {
        handle(req, res);
      });

      server.listen(3000, (err) => {
        if (err) {
          console.error('❌ Error starting server:', err);
          console.log('💡 Trying port 3001...');

          // Try port 3001 if 3000 fails
          server.listen(3001, (err2) => {
            if (err2) {
              console.error('❌ Error starting server on port 3001:', err2);
              process.exit(1);
            }
            console.log('🚀 Server running on http://localhost:3001');
            console.log('🌐 Open your browser to see ClothingDrop!');
          });
        } else {
          console.log('🚀 Server running on http://localhost:3000');
          console.log('🌐 Open your browser to see ClothingDrop!');
          console.log('🛑 Press Ctrl+C to stop the server');
        }
      });

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down server...');
        server.close(() => {
          console.log('✅ Server stopped');
          process.exit(0);
        });
      });

    }).catch((err) => {
      console.error('❌ Error preparing Next.js:', err);
      console.log('💡 Try running: npm install');
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Error loading Next.js:', error.message);
    console.log('💡 Make sure dependencies are installed: npm install');
    process.exit(1);
  }
}
