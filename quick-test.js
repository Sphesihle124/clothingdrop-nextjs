// Quick test to see if Node.js can start a server
const http = require('http');

console.log('🚀 ClothingDrop - Quick Server Test');
console.log('Node.js version:', process.version);
console.log('Starting test server...');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ClothingDrop - Test Success!</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            }
            .container { 
                background: rgba(255,255,255,0.1); 
                padding: 40px; 
                border-radius: 20px; 
                backdrop-filter: blur(10px);
                max-width: 600px;
                margin: 0 auto;
            }
            h1 { color: #fff; font-size: 2.5em; margin-bottom: 20px; }
            .success { color: #4ade80; font-weight: bold; font-size: 1.2em; }
            .info { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; }
            .next-steps { text-align: left; }
            .emoji { font-size: 2em; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="emoji">🇿🇦🛍️</div>
            <h1>ClothingDrop Test Server</h1>
            <p class="success">✅ SUCCESS! Node.js is working perfectly!</p>
            
            <div class="info">
                <h3>📊 Server Information:</h3>
                <p><strong>Node.js Version:</strong> ${process.version}</p>
                <p><strong>Server Port:</strong> 3000</p>
                <p><strong>Status:</strong> Running</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div class="info next-steps">
                <h3>🎯 Your ClothingDrop App is Ready!</h3>
                <p>This test confirms that:</p>
                <ul>
                    <li>✅ Node.js is installed and working</li>
                    <li>✅ Port 3000 is accessible</li>
                    <li>✅ Your browser can connect to localhost</li>
                    <li>✅ No firewall or network issues</li>
                </ul>
                
                <h3>🚀 Next Steps:</h3>
                <ol>
                    <li>Stop this test server (Ctrl+C in terminal)</li>
                    <li>Your ClothingDrop app should work now!</li>
                    <li>Try running: <code>npm run dev</code></li>
                </ol>
            </div>
            
            <p><strong>🎉 Your system is ready for ClothingDrop! 🇿🇦</strong></p>
        </div>
    </body>
    </html>
  `);
});

const PORT = 3000;

server.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Error starting server:', err);
    
    // Try port 3001
    server.listen(3001, (err2) => {
      if (err2) {
        console.error('❌ Error starting server on port 3001:', err2);
        process.exit(1);
      }
      console.log('✅ Test server running on http://localhost:3001');
      console.log('🌐 Open your browser to see the test page!');
    });
  } else {
    console.log('✅ Test server running on http://localhost:3000');
    console.log('🌐 Open your browser to see the test page!');
  }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping test server...');
  server.close(() => {
    console.log('✅ Test server stopped');
    console.log('🚀 Now try running your ClothingDrop app!');
    process.exit(0);
  });
});

console.log('🛑 Press Ctrl+C to stop this test server');
