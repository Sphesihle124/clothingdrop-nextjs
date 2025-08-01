// Simple test server to check if Node.js is working
const http = require('http');
const path = require('path');

console.log('🔍 Testing Node.js server...');
console.log('Node.js version:', process.version);
console.log('Current directory:', process.cwd());

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ClothingDrop - Server Test</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2563eb; }
            .success { color: #16a34a; font-weight: bold; }
            .info { background: #eff6ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 ClothingDrop Server Test</h1>
            <p class="success">✅ SUCCESS! Node.js server is working!</p>
            
            <div class="info">
                <h3>📊 Server Information:</h3>
                <p><strong>Node.js Version:</strong> ${process.version}</p>
                <p><strong>Server Port:</strong> 3000</p>
                <p><strong>Status:</strong> Running</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <h3>🎯 Next Steps:</h3>
            <ol>
                <li>This test confirms Node.js is working</li>
                <li>Stop this test server (Ctrl+C in terminal)</li>
                <li>Run your ClothingDrop app: <code>npm run dev</code></li>
                <li>If npm doesn't work, try: <code>npx next dev</code></li>
            </ol>
            
            <h3>🔧 If ClothingDrop still doesn't work:</h3>
            <ul>
                <li>Check Windows Firewall settings</li>
                <li>Try running as Administrator</li>
                <li>Try different port: <code>npm run dev -- --port 3001</code></li>
                <li>Check antivirus software</li>
            </ul>
            
            <p><strong>Your ClothingDrop app should work! 🇿🇦🛍️</strong></p>
        </div>
    </body>
    </html>
  `);
});

const PORT = 3000;

server.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Error starting server:', err);
    console.log('💡 Port 3000 might be in use. Trying port 3001...');
    
    // Try port 3001
    server.listen(3001, (err2) => {
      if (err2) {
        console.error('❌ Error starting server on port 3001:', err2);
        process.exit(1);
      }
      console.log('✅ Test server running on http://localhost:3001');
      console.log('🌐 Open your browser to see if it works!');
    });
  } else {
    console.log('✅ Test server running on http://localhost:3000');
    console.log('🌐 Open your browser to see if it works!');
  }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping test server...');
  server.close(() => {
    console.log('✅ Test server stopped');
    process.exit(0);
  });
});

console.log('🚀 Starting test server...');
console.log('🛑 Press Ctrl+C to stop');
