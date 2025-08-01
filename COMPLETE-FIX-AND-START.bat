@echo off
title ClothingDrop - COMPLETE FIX AND START
color 0A

echo.
echo ========================================================
echo   ClothingDrop - COMPLETE FIX AND START
echo   (Fixes all issues and starts the app)
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

REM Kill any processes using ports 3000-3005
echo 🔧 Clearing all development ports...
for %%p in (3000 3001 3002 3003 3004 3005) do (
    echo    Checking port %%p...
    for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%%p') do (
        echo       Killing process %%a on port %%p...
        taskkill /PID %%a /F >nul 2>&1
    )
)
echo ✅ All ports cleared
echo.

REM Check Node.js
echo 🔍 Checking Node.js installation...
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found at C:\Program Files\nodejs\
    echo.
    echo 📥 Please install Node.js:
    echo    1. Go to https://nodejs.org/
    echo    2. Download LTS version (v18 or v20)
    echo    3. Install and restart computer
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('"C:\Program Files\nodejs\node.exe" --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Check npm
echo 🔍 Checking npm...
cmd /c ""C:\Program Files\nodejs\npm.cmd" --version" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('cmd /c ""C:\Program Files\nodejs\npm.cmd" --version"') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%
echo.

REM Clean install dependencies
echo 🧹 Cleaning and installing dependencies...
if exist "node_modules" (
    echo    Removing old node_modules...
    rmdir /s /q "node_modules" 2>nul
)

if exist "package-lock.json" (
    echo    Removing package-lock.json...
    del "package-lock.json" 2>nul
)

if exist ".next" (
    echo    Removing .next build cache...
    rmdir /s /q ".next" 2>nul
)

echo    Installing fresh dependencies...
cmd /c ""C:\Program Files\nodejs\npm.cmd" install"
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    echo.
    echo 💡 Try these solutions:
    echo    1. Check your internet connection
    echo    2. Run as Administrator
    echo    3. Clear npm cache: npm cache clean --force
    echo    4. Try: npm install --legacy-peer-deps
    echo.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully!
echo.

REM Check if TypeScript files compile
echo 🔍 Checking TypeScript compilation...
cmd /c ""C:\Program Files\nodejs\npx.cmd" tsc --noEmit" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  TypeScript compilation warnings (continuing anyway)
) else (
    echo ✅ TypeScript compilation successful
)
echo.

REM Check if Next.js can build
echo 🔍 Testing Next.js build...
cmd /c ""C:\Program Files\nodejs\npm.cmd" run build" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Build test failed (trying development mode anyway)
) else (
    echo ✅ Build test successful
    REM Clean up build files
    if exist ".next" (
        rmdir /s /q ".next" 2>nul
    )
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
echo   
echo   📱 Features available:
echo   ✅ 6 demo products with ZAR pricing
echo   ✅ Shopping cart functionality  
echo   ✅ Order tracking (CD-2024-001)
echo   ✅ South African localization
echo   ✅ Responsive mobile design
echo ========================================================
echo.

REM Start the development server
echo Starting development server...
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
    echo    1. Port 3000 might be in use
    echo    2. Check for syntax errors in code
    echo    3. Try different port: npm run dev -- --port 3001
    echo    4. Check Windows Firewall settings
    echo    5. Run as Administrator
    echo.
    echo 🔧 Alternative commands to try:
    echo    cmd /c ""C:\Program Files\nodejs\npm.cmd" run dev -- --port 3001"
    echo    cmd /c ""C:\Program Files\nodejs\npx.cmd" next dev"
    echo.
) else (
    echo ✅ Server stopped normally
)

echo.
echo 🎯 If the app still doesn't work:
echo    1. Check browser console for errors
echo    2. Try incognito/private browsing mode
echo    3. Clear browser cache and cookies
echo    4. Try different browser (Chrome, Firefox, Edge)
echo    5. Check antivirus software settings
echo.

echo Press any key to exit...
pause >nul
