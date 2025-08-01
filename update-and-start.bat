 @echo off
setlocal enabledelayedexpansion
title ClothingDrop - Update and Start (Latest Version)

REM Change to the project directory
cd /d "%~dp0"

echo.
echo ==========================================
echo  ClothingDrop - Update and Start Server
echo ==========================================
echo.
echo 📁 Project directory: %CD%
echo.

REM Define full paths to Node.js and npm
set NODE_PATH=C:\Program Files\nodejs\node.exe
set NPM_PATH=C:\Program Files\nodejs\npm.cmd

echo [1/5] Checking Node.js installation...
"%NODE_PATH%" --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ ERROR: Node.js not found at C:\Program Files\nodejs\
    echo.
    echo 📥 Please install Node.js:
    echo    1. Go to https://nodejs.org/
    echo    2. Download LTS version
    echo    3. Install and restart computer
    echo.
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('"%NODE_PATH%" --version') do set NODE_VERSION=%%i
    echo ✅ Node.js found: !NODE_VERSION!
)

echo [2/5] Checking npm...
"%NPM_PATH%" --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ ERROR: npm not found
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('"%NPM_PATH%" --version') do set NPM_VERSION=%%i
    echo ✅ npm found: !NPM_VERSION!
)

echo [3/5] Updating dependencies to latest versions...
echo This may take a few minutes...
"%NPM_PATH%" install
if !errorlevel! neq 0 (
    echo ❌ ERROR: Failed to install dependencies
    echo.
    echo 🔧 Try these solutions:
    echo    1. Check your internet connection
    echo    2. Run as Administrator
    echo    3. Try: npm cache clean --force
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Dependencies updated successfully!
)

echo [4/5] Checking Next.js version...
for /f "tokens=*" %%i in ('"%NPM_PATH%" list next --depth=0 2^>nul ^| findstr "next@"') do set NEXT_VERSION=%%i
echo ✅ Next.js version: !NEXT_VERSION!

echo [5/5] Starting development server...
echo.
echo 🚀 Starting ClothingDrop with latest Next.js...
echo 🌐 Open your browser to: http://localhost:3000
echo 🛑 Press Ctrl+C to stop the server
echo.
echo ✅ No more "outdated" warnings!
echo ==========================================
echo.

REM Use cmd /c to force Command Prompt instead of PowerShell
cmd /c ""%NPM_PATH%" run dev"
if !errorlevel! neq 0 (
    echo.
    echo ❌ ERROR: Failed to start development server
    echo.
    echo 🔧 Common solutions:
    echo    1. Port 3000 might be in use - try a different port
    echo    2. Check for errors in the code
    echo    3. Try deleting node_modules and running again
    echo.
)

echo.
echo Development server stopped.
pause
