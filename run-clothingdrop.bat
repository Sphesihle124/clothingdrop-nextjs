@echo off
setlocal enabledelayedexpansion
title ClothingDrop - Quick Start

echo.
echo ==========================================
echo  ClothingDrop - Quick Start
echo ==========================================
echo.

REM Navigate to the correct project directory
echo 📁 Navigating to project directory...
cd /d "C:\Users\SPHESIHLE\Documents\augment-projects\delivery app"

if !errorlevel! neq 0 (
    echo ❌ ERROR: Could not find project directory
    echo.
    echo 🔧 Please check if the project exists at:
    echo    C:\Users\SPHESIHLE\Documents\augment-projects\delivery app
    echo.
    pause
    exit /b 1
)

echo ✅ Found project directory: %CD%
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ ERROR: package.json not found
    echo.
    echo 🔧 This might not be the correct project directory
    echo 📂 Current directory contents:
    dir /b
    echo.
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

REM Check Node.js
echo [1/4] Checking Node.js...
node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ ERROR: Node.js not found
    echo.
    echo 📥 Install Node.js:
    echo    1. Go to https://nodejs.org/
    echo    2. Download LTS version
    echo    3. Install and restart computer
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo ✅ Node.js: !NODE_VERSION!
)

REM Check npm
echo [2/4] Checking npm...
npm --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ ERROR: npm not found
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo ✅ npm: !NPM_VERSION!
)

REM Install dependencies
echo [3/4] Installing dependencies...
npm install
if !errorlevel! neq 0 (
    echo ❌ ERROR: Failed to install dependencies
    pause
    exit /b 1
) else (
    echo ✅ Dependencies installed!
)

REM Start development server
echo [4/4] Starting development server...
echo.
echo 🚀 Starting ClothingDrop...
echo 🌐 Open browser to: http://localhost:3000
echo 🛑 Press Ctrl+C to stop
echo.
echo ==========================================
echo.

npm run dev

echo.
echo Development server stopped.
pause
