// Minimal test to see if Node.js is working
console.log('='.repeat(50));
console.log('ClothingDrop - Minimal Test');
console.log('='.repeat(50));
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Current working directory:', process.cwd());
console.log('Script location:', __dirname);

// Test if we can access the file system
const fs = require('fs');
const path = require('path');

console.log('\n📁 Checking project files...');

// Check package.json
if (fs.existsSync('package.json')) {
  console.log('✅ package.json found');
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('   - Name:', pkg.name);
    console.log('   - Version:', pkg.version);
    console.log('   - Scripts:', Object.keys(pkg.scripts || {}));
  } catch (e) {
    console.log('❌ Error reading package.json:', e.message);
  }
} else {
  console.log('❌ package.json not found');
}

// Check node_modules
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules found');
  
  // Check for Next.js
  if (fs.existsSync('node_modules/next')) {
    console.log('✅ Next.js found in node_modules');
    
    // Try to require Next.js
    try {
      const next = require('next');
      console.log('✅ Next.js can be required');
      console.log('   - Next.js loaded successfully');
    } catch (e) {
      console.log('❌ Error requiring Next.js:', e.message);
    }
  } else {
    console.log('❌ Next.js not found in node_modules');
  }
} else {
  console.log('❌ node_modules not found');
}

console.log('\n🔍 Environment check complete');
console.log('='.repeat(50));

// If everything looks good, try to start a simple HTTP server
if (fs.existsSync('package.json') && fs.existsSync('node_modules/next')) {
  console.log('\n🚀 Attempting to start Next.js...');
  
  try {
    const { spawn } = require('child_process');
    
    // Try to run npm run dev
    const npmPath = 'C:\\Program Files\\nodejs\\npm.cmd';
    
    console.log('Starting with command:', npmPath, 'run dev');
    
    const child = spawn(npmPath, ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    child.on('error', (error) => {
      console.error('❌ Error starting npm:', error.message);
    });
    
    child.on('close', (code) => {
      console.log(`\n📊 Process exited with code ${code}`);
    });
    
    // Handle Ctrl+C
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping...');
      child.kill('SIGINT');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error in spawn:', error.message);
  }
} else {
  console.log('\n💡 Please run: npm install');
  console.log('💡 Then try running this script again');
}
