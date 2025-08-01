@echo off
title ClothingDrop - FINAL START SOLUTION
color 0A

echo.
echo ========================================================
echo   ClothingDrop - FINAL START SOLUTION
echo   This will fix all issues and start your app
echo ========================================================
echo.

REM Change to the directory where this batch file is located
cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

REM Step 1: Check if we're in the right place
if not exist "package.json" (
    echo ❌ ERROR: package.json not found!
    echo.
    echo 💡 Make sure this batch file is in your project folder
    echo    Expected location: C:\Users\SPHESIHLE\Documents\augment-projects\delivery app
    echo.
    pause
    exit /b 1
)

echo ✅ Found package.json - we're in the right place!
echo.

REM Step 2: Kill any processes using port 3000
echo 🔧 Step 1: Clearing port 3000...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3000') do (
    echo    Killing process %%a...
    taskkill /PID %%a /F >nul 2>&1
)
echo ✅ Port 3000 cleared
echo.

REM Step 3: Check Node.js installation
echo 🔍 Step 2: Checking Node.js...
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo 📥 Please install Node.js:
    echo    1. Go to https://nodejs.org/
    echo    2. Download and install LTS version
    echo    3. Restart your computer
    echo    4. Run this script again
    echo.
    pause
    exit /b 1
)

for /f %%i in ('"C:\Program Files\nodejs\node.exe" --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Step 4: Check npm
echo 🔍 Step 3: Checking npm...
"C:\Program Files\nodejs\npm.cmd" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
)

for /f %%i in ('"C:\Program Files\nodejs\npm.cmd" --version') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%
echo.

REM Step 5: Install/update dependencies
echo 📦 Step 4: Installing dependencies...
echo    This may take a few minutes...
"C:\Program Files\nodejs\npm.cmd" install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies!
    echo.
    echo 💡 Try these solutions:
    echo    1. Check your internet connection
    echo    2. Run as Administrator
    echo    3. Delete node_modules folder and try again
    echo.
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully!
echo.

REM Step 6: Start the development server
echo 🚀 Step 5: Starting ClothingDrop...
echo.
echo ========================================================
echo   🌐 Your app will be available at:
echo   
echo   http://localhost:3000
echo   
echo   🛑 Press Ctrl+C to stop the server
echo ========================================================
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

REM If we get here, the server stopped
echo.
echo ========================================================
echo   Development server stopped
echo ========================================================
echo.

REM Check if it was an error
if %errorlevel% neq 0 (
    echo ❌ Server stopped with an error
    echo.
    echo 💡 Common solutions:
    echo    1. Port 3000 might be in use - try: npm run dev -- --port 3001
    echo    2. Try deleting node_modules and running: npm install
    echo    3. Check for syntax errors in your code
    echo.
) else (
    echo ✅ Server stopped normally
)

echo Press any key to exit...
pause >nul
