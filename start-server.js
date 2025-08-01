const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting ClothingDrop Development Server...');
console.log('📁 Project directory:', __dirname);

// Try to start Next.js development server
const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next.cmd');
const args = ['dev'];

console.log('🔧 Starting Next.js...');

const child = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

child.on('error', (error) => {
  console.error('❌ Error starting server:', error.message);
  console.log('💡 Try running: npm install');
  process.exit(1);
});

child.on('close', (code) => {
  console.log(`\n📊 Server process exited with code ${code}`);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping server...');
  child.kill('SIGINT');
  process.exit(0);
});
