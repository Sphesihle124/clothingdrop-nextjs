@echo off
title ClothingDrop - Status Check
color 0B

echo.
echo ========================================================
echo   ClothingDrop - Server Status Check
echo ========================================================
echo.

REM Check if port 3000 is in use
echo 🔍 Checking port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Server is running on port 3000!
    echo.
    echo 📊 Process details:
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        echo    Process ID: %%a
    )
    echo.
    echo 🌐 Your app should be available at:
    echo    http://localhost:3000
    echo.
    echo 🚀 ClothingDrop is RUNNING successfully!
) else (
    echo ❌ No server found on port 3000
    echo.
    echo 💡 To start the server:
    echo    1. Double-click FINAL-START.bat
    echo    2. Or run: npm run dev
    echo.
)

echo.
echo ========================================================
echo   Status check complete
echo ========================================================
echo.

pause
