@echo off
title ClothingDrop - Command Prompt Version

echo.
echo ==========================================
echo  ClothingDrop - Command Prompt (No PowerShell)
echo ==========================================
echo.

REM Change to the directory where this batch file is located
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

echo 🚀 Starting ClothingDrop development server...
echo 🌐 Open browser to: http://localhost:3000
echo 🛑 Press Ctrl+C to stop server
echo.
echo ==========================================
echo.

REM Use npm directly (this avoids PowerShell completely)
npm run dev

echo.
echo Development server stopped.
pause
