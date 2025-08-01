@echo off
title ClothingDrop - WORKING START
color 0A

echo.
echo ==========================================
echo   ClothingDrop - WORKING START (FIXED)
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
echo 🔧 Clearing port 3000...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3000') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo ✅ Port cleared
echo.

REM Check Node.js
echo 🔍 Checking Node.js...
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    echo 💡 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Check npm
echo 🔍 Checking npm...
"C:\Program Files\nodejs\npm.cmd" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found
    pause
    exit /b 1
)

echo ✅ npm found
echo.

REM Install dependencies if needed
echo 🔍 Checking dependencies...
if not exist "node_modules" (
    echo ⚠️ Installing dependencies...
    "C:\Program Files\nodejs\npm.cmd" install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo ✅ Dependencies ready
echo.

echo 🚀 Starting ClothingDrop development server...
echo.
echo 🌐 Your app will be available at: http://localhost:3000
echo 🛑 Press Ctrl+C to stop the server
echo.
echo ==========================================
echo.

REM Start the development server using Command Prompt (bypasses PowerShell)
cmd /c ""C:\Program Files\nodejs\npm.cmd" run dev"

REM If we get here, the server stopped
echo.
echo ==========================================
echo   Development server stopped
echo ==========================================
echo.

if %errorlevel% neq 0 (
    echo ❌ Server stopped with an error
    echo.
    echo 💡 Common solutions:
    echo    1. Port 3000 might be in use
    echo    2. Try: npm run dev -- --port 3001
    echo    3. Check for syntax errors in code
    echo    4. Try: npm install
    echo.
) else (
    echo ✅ Server stopped normally
)

echo Press any key to exit...
pause >nul
