@echo off
title ClothingDrop - Fixed Startup
setlocal enabledelayedexpansion

echo.
echo ==========================================
echo  ClothingDrop - Fixed Startup Script
echo ==========================================
echo.

REM Change to script directory
cd /d "%~dp0"
echo 📁 Current directory: %CD%
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ ERROR: package.json not found
    echo Make sure you're in the correct project folder
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

REM Kill any processes using port 3000
echo 🔧 Checking for processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Killing process %%a on port 3000...
    taskkill /PID %%a /F >nul 2>&1
)

echo ✅ Port 3000 cleared
echo.

REM Check Node.js
echo 🔍 Checking Node.js...
if exist "C:\Program Files\nodejs\node.exe" (
    echo ✅ Node.js found
) else (
    echo ❌ Node.js not found at expected location
    pause
    exit /b 1
)

REM Check npm
echo 🔍 Checking npm...
if exist "C:\Program Files\nodejs\npm.cmd" (
    echo ✅ npm found
) else (
    echo ❌ npm not found at expected location
    pause
    exit /b 1
)

REM Check node_modules
echo 🔍 Checking dependencies...
if not exist "node_modules" (
    echo ⚠️  node_modules not found, installing dependencies...
    "C:\Program Files\nodejs\npm.cmd" install
    if !errorlevel! neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo ✅ Dependencies ready
echo.

echo 🚀 Starting ClothingDrop development server...
echo 🌐 Open browser to: http://localhost:3000
echo 🛑 Press Ctrl+C to stop server
echo.
echo ==========================================
echo.

REM Start the development server
"C:\Program Files\nodejs\npm.cmd" run dev

if !errorlevel! neq 0 (
    echo.
    echo ❌ Failed to start development server
    echo.
    echo 💡 Troubleshooting tips:
    echo    1. Try running: npm install
    echo    2. Check if port 3000 is available
    echo    3. Try using port 3001: npm run dev -- --port 3001
    echo.
)

echo.
echo Development server stopped.
pause
