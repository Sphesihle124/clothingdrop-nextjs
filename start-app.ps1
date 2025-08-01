Write-Host "ClothingDrop - Starting Development Server" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

Write-Host "`nChecking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nChecking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: npm is not available" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`nStarting development server..." -ForegroundColor Yellow
Write-Host "Open your browser to: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

try {
    npm run dev
} catch {
    Write-Host "ERROR: Failed to start development server" -ForegroundColor Red
    Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
