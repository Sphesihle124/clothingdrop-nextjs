@echo off
title ClothingDrop - START NOW
color 0A

echo.
echo ========================================================
echo   ClothingDrop - STARTING YOUR APP NOW
echo ========================================================
echo.

REM Change to the directory where this batch file is located
cd /d "%~dp0"

echo 📁 Directory: %CD%
echo.

REM Kill any processes using port 3000
echo 🔧 Clearing port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    echo ✅ Port cleared
) else (
    echo ✅ Port 3000 is available
)

echo.
echo 🚀 Starting ClothingDrop...
echo.

REM Method 1: Try npm run dev
echo [Method 1] Using npm run dev...
start "ClothingDrop-npm" /min cmd /k "cd /d \"%CD%\" && npm run dev"

REM Wait 5 seconds
timeout /t 5 /nobreak >nul

REM Method 2: Try npx next dev
echo [Method 2] Using npx next dev...
start "ClothingDrop-npx" /min cmd /k "cd /d \"%CD%\" && npx next dev --port 3001"

REM Wait 5 seconds
timeout /t 5 /nobreak >nul

REM Method 3: Try with full path
echo [Method 3] Using full npm path...
start "ClothingDrop-full" /min cmd /k "cd /d \"%CD%\" && \"C:\Program Files\nodejs\npm.cmd\" run dev -- --port 3002"

echo.
echo ⏳ Waiting for servers to start...
timeout /t 10 /nobreak >nul

echo.
echo ========================================================
echo   OPENING BROWSERS...
echo ========================================================
echo.

echo 🌐 Opening Chrome with multiple URLs...

REM Try to open Chrome with different ports
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:3000
    timeout /t 2 /nobreak >nul
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:3001
    timeout /t 2 /nobreak >nul
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" http://localhost:3002
) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3000
    timeout /t 2 /nobreak >nul
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3001
    timeout /t 2 /nobreak >nul
    start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3002
) else (
    echo ⚠️  Chrome not found, using default browser...
    start http://localhost:3000
    timeout /t 2 /nobreak >nul
    start http://localhost:3001
    timeout /t 2 /nobreak >nul
    start http://localhost:3002
)

echo.
echo ========================================================
echo   ClothingDrop LAUNCHED!
echo ========================================================
echo.

echo 🎯 Try these URLs in your browser:
echo.
echo    http://localhost:3000
echo    http://localhost:3001
echo    http://localhost:3002
echo.

echo 🛍️ Your ClothingDrop features:
echo    ✅ 6 demo products with ZAR pricing
echo    ✅ Shopping cart functionality
echo    ✅ Order tracking (CD-2024-001)
echo    ✅ South African localization
echo    ✅ Johannesburg addresses
echo.

echo 🔧 Server status:
echo    - Multiple servers started on different ports
echo    - Check the command windows that opened
echo    - Look for "Ready" or "Local:" messages
echo.

echo 💡 If none work:
echo    1. Wait 1-2 minutes for servers to fully start
echo    2. Check Windows Firewall settings
echo    3. Try running as Administrator
echo    4. Restart your computer and try again
echo.

echo ========================================================
echo   SUCCESS! Your app should be running now! 🇿🇦🛍️
echo ========================================================
echo.

pause
