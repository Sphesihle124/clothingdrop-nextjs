# ClothingDrop - PowerShell Bypass Script
# This script bypasses execution policy restrictions

Write-Host "ClothingDrop - Starting with PowerShell Bypass" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Change to script directory
Set-Location $PSScriptRoot

Write-Host "`n📁 Current directory: $(Get-Location)" -ForegroundColor Yellow

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ ERROR: package.json not found in current directory" -ForegroundColor Red
    Write-Host "Make sure you're in the correct project folder" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Found package.json" -ForegroundColor Green

# Define Node.js paths
$nodePath = "C:\Program Files\nodejs\node.exe"
$npmPath = "C:\Program Files\nodejs\npm.cmd"

Write-Host "`n[1/3] Checking Node.js..." -ForegroundColor Yellow
if (Test-Path $nodePath) {
    $nodeVersion = & $nodePath --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ ERROR: Node.js not found" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n[2/3] Checking npm..." -ForegroundColor Yellow
if (Test-Path $npmPath) {
    $npmVersion = & $npmPath --version
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ ERROR: npm not found" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "`n[3/3] Starting development server..." -ForegroundColor Yellow
Write-Host "🚀 Starting ClothingDrop..." -ForegroundColor Cyan
Write-Host "🌐 Open browser to: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🛑 Press Ctrl+C to stop server" -ForegroundColor Yellow
Write-Host "`n=============================================" -ForegroundColor Green

try {
    & $npmPath run dev
} catch {
    Write-Host "`n❌ ERROR: Failed to start development server" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nDevelopment server stopped." -ForegroundColor Yellow
Read-Host "Press Enter to exit"
