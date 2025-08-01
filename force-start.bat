@echo off
title ClothingDrop - Force Start
echo.
echo ==========================================
echo  ClothingDrop - Force Start (All Issues Fixed)
echo ==========================================
echo.

REM Kill any existing processes on port 3000
echo 🔧 Killing any processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3000') do (
    taskkill /PID %%a /F >nul 2>&1
)

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Change to project directory
cd /d "%~dp0"
echo 📁 Directory: %CD%

REM Check if we're in the right place
if not exist "package.json" (
    echo ❌ package.json not found!
    pause
    exit /b 1
)

echo ✅ Found package.json

REM Try multiple methods to start the server
echo.
echo 🚀 Attempting to start server...
echo.

REM Method 1: Direct npm call
echo [Method 1] Using direct npm path...
"C:\Program Files\nodejs\npm.cmd" run dev 2>nul
if %errorlevel% equ 0 goto :success

REM Method 2: Using npx
echo [Method 2] Using npx...
"C:\Program Files\nodejs\npx.cmd" next dev 2>nul
if %errorlevel% equ 0 goto :success

REM Method 3: Direct next call
echo [Method 3] Using direct next...
"node_modules\.bin\next.cmd" dev 2>nul
if %errorlevel% equ 0 goto :success

REM Method 4: Node.js direct
echo [Method 4] Using Node.js direct...
"C:\Program Files\nodejs\node.exe" "node_modules\next\dist\bin\next" dev 2>nul
if %errorlevel% equ 0 goto :success

echo.
echo ❌ All methods failed. Let's try installing dependencies first...
echo.

"C:\Program Files\nodejs\npm.cmd" install
if %errorlevel% neq 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo ✅ Dependencies installed. Trying again...
"C:\Program Files\nodejs\npm.cmd" run dev

:success
echo.
echo 🎉 Server should be starting...
echo 🌐 Open http://localhost:3000 in your browser
echo.

pause
