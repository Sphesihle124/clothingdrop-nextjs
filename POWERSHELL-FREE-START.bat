@echo off
title ClothingDrop - PowerShell-Free Start
color 0A

echo.
echo ========================================================
echo   ClothingDrop - PowerShell-Free Startup
echo   (Bypasses all PowerShell execution policy issues)
echo ========================================================
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
    echo    Killing process %%a...
    taskkill /PID %%a /F >nul 2>&1
)
echo ✅ Port 3000 cleared
echo.

REM Check Node.js using Command Prompt
echo 🔍 Checking Node.js...
cmd /c ""C:\Program Files\nodejs\node.exe" --version" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found at C:\Program Files\nodejs\
    echo.
    echo 📥 Please install Node.js:
    echo    1. Go to https://nodejs.org/
    echo    2. Download LTS version
    echo    3. Install and restart computer
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Check npm using Command Prompt
echo 🔍 Checking npm...
cmd /c ""C:\Program Files\nodejs\npm.cmd" --version" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found
    pause
    exit /b 1
)

echo ✅ npm found
echo.

REM Install dependencies if needed using Command Prompt
echo 🔍 Checking dependencies...
if not exist "node_modules" (
    echo ⚠️ Installing dependencies (this may take a few minutes)...
    cmd /c ""C:\Program Files\nodejs\npm.cmd" install"
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        echo.
        echo 💡 Try these solutions:
        echo    1. Check your internet connection
        echo    2. Run as Administrator
        echo    3. Try: npm cache clean --force
        echo.
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
) else (
    echo ✅ Dependencies already installed
)

echo.
echo 🚀 Starting ClothingDrop development server...
echo.
echo ========================================================
echo   🌐 Your app will be available at:
echo   
echo   http://localhost:3000
echo   
echo   🛑 Press Ctrl+C to stop the server
echo ========================================================
echo.

REM Start the development server using Command Prompt (bypasses PowerShell completely)
echo Starting server with Command Prompt (no PowerShell)...
cmd /c ""C:\Program Files\nodejs\npm.cmd" run dev"

REM If we get here, the server stopped
echo.
echo ========================================================
echo   Development server stopped
echo ========================================================
echo.

if %errorlevel% neq 0 (
    echo ❌ Server stopped with an error
    echo.
    echo 💡 Common solutions:
    echo    1. Port 3000 might be in use - try different port
    echo    2. Check for syntax errors in your code
    echo    3. Try deleting node_modules and running again
    echo    4. Run as Administrator
    echo.
    echo 🔧 Alternative commands to try:
    echo    cmd /c ""C:\Program Files\nodejs\npm.cmd" run dev -- --port 3001"
    echo    cmd /c ""C:\Program Files\nodejs\npx.cmd" next dev"
    echo.
) else (
    echo ✅ Server stopped normally
)

echo Press any key to exit...
pause >nul
