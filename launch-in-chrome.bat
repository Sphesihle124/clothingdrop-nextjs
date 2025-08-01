@echo off
title ClothingDrop - Launch in Chrome
color 0A

echo.
echo ========================================================
echo   ClothingDrop - Launching in Chrome Browser
echo ========================================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

REM Kill any existing processes on port 3000
echo 🔧 Clearing port 3000...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3000') do (
    echo    Killing process %%a...
    taskkill /PID %%a /F >nul 2>&1
)

echo ✅ Port cleared
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ ERROR: package.json not found!
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

echo 🚀 Starting ClothingDrop development server...
echo.

REM Start the development server in background
start /min "ClothingDrop Server" cmd /c "\"C:\Program Files\nodejs\npm.cmd\" run dev"

echo ⏳ Waiting for server to start...
timeout /t 8 /nobreak >nul

echo 🌐 Opening Chrome browser...
echo.

REM Try different Chrome locations
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    echo ✅ Found Chrome at Program Files
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:3000
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    echo ✅ Found Chrome at Program Files (x86)
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3000
) else (
    echo ⚠️  Chrome not found at standard locations
    echo 💡 Trying default browser...
    start http://localhost:3000
)

echo.
echo ========================================================
echo   ClothingDrop Launched!
echo ========================================================
echo.

echo 🎯 Your app should now be open in Chrome at:
echo    http://localhost:3000
echo.

echo 🛍️ Features available:
echo    ✅ Browse 6 demo products
echo    ✅ Shopping cart with ZAR pricing
echo    ✅ Order tracking (CD-2024-001)
echo    ✅ South African localization
echo.

echo 🔧 Server management:
echo    - Server is running in background
echo    - Close this window to keep server running
echo    - Press Ctrl+C in server window to stop
echo.

echo 💡 If the page doesn't load:
echo    1. Wait 30 seconds and refresh
echo    2. Try http://localhost:3001
echo    3. Check Windows Firewall
echo    4. Try running as Administrator
echo.

echo Press any key to close this window...
pause >nul
