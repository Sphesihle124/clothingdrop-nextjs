@echo off
setlocal enabledelayedexpansion
title ClothingDrop - Development Server

REM Change to the directory where this batch file is located
cd /d "%~dp0"

echo.
echo ==========================================
echo  ClothingDrop - Starting Development Server
echo ==========================================
echo.
echo 📁 Current directory: %CD%
echo.

REM Check if package.json exists in current directory
if not exist "package.json" (
    echo ❌ ERROR: package.json not found in current directory
    echo.
    echo 🔧 Solutions:
    echo    1. Make sure you're running this from the project folder
    echo    2. The correct path should be:
    echo       C:\Users\SPHESIHLE\Documents\augment-projects\delivery app
    echo    3. Copy this batch file to the project folder if needed
    echo.
    echo 📂 Current directory contents:
    dir /b
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Found package.json in current directory
)

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo.
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo.
    echo 📥 Please install Node.js:
    echo    1. Go to https://nodejs.org/
    echo    2. Download the LTS version
    echo    3. Run the installer and check "Add to PATH"
    echo    4. Restart your computer
    echo    5. Run this script again
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js found: !NODE_VERSION!
)

echo.
echo [2/4] Checking npm...
npm --version >nul 2>&1
if !errorlevel! neq 0 (
    echo.
    echo ❌ ERROR: npm is not available
    echo.
    echo 🔧 Try these solutions:
    echo    1. Restart your computer
    echo    2. Reinstall Node.js from https://nodejs.org/
    echo    3. Make sure to check "Add to PATH" during installation
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm found: !NPM_VERSION!
)

echo.
echo [3/4] Installing dependencies...
echo This may take a few minutes...
npm install
if !errorlevel! neq 0 (
    echo.
    echo ❌ ERROR: Failed to install dependencies
    echo.
    echo 🔧 Try these solutions:
    echo    1. Delete node_modules folder and try again
    echo    2. Run as Administrator
    echo    3. Check your internet connection
    echo    4. Try: npm cache clean --force
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Dependencies installed successfully!
)

echo.
echo [4/4] Starting development server...
echo.
echo 🚀 Starting ClothingDrop...
echo 🌐 Open your browser to: http://localhost:3000
echo 🛑 Press Ctrl+C to stop the server
echo.
echo ==========================================
echo.

npm run dev
if !errorlevel! neq 0 (
    echo.
    echo ❌ ERROR: Failed to start development server
    echo.
    echo 🔧 Common solutions:
    echo    1. Port 3000 might be in use - try: npm run dev -- --port 3001
    echo    2. Check for TypeScript errors in the code
    echo    3. Try deleting node_modules and running npm install again
    echo.
)

echo.
echo Development server stopped.
pause
