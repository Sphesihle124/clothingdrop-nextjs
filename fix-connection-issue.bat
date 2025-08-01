@echo off
title ClothingDrop - Fix Connection Issue
color 0C

echo.
echo ========================================================
echo   ClothingDrop - Connection Issue Troubleshooter
echo ========================================================
echo.

cd /d "%~dp0"

echo 🔍 DIAGNOSING CONNECTION ISSUE...
echo.

echo [1/6] Checking project directory...
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found - wrong directory!
    pause
    exit /b 1
)

echo [2/6] Checking Node.js installation...
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('"C:\Program Files\nodejs\node.exe" --version') do echo ✅ Node.js: %%i
) else (
    echo ❌ Node.js not found at expected location
    echo 💡 Try: where node
    pause
    exit /b 1
)

echo [3/6] Checking npm...
"C:\Program Files\nodejs\npm.cmd" --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('"C:\Program Files\nodejs\npm.cmd" --version') do echo ✅ npm: %%i
) else (
    echo ❌ npm not found
    pause
    exit /b 1
)

echo [4/6] Checking for running processes on ports...
echo Checking port 3000...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Port 3000 is in use
    netstat -ano | findstr :3000
) else (
    echo ✅ Port 3000 is available
)

echo Checking port 3001...
netstat -ano | findstr :3001 >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Port 3001 is in use
    netstat -ano | findstr :3001
) else (
    echo ✅ Port 3001 is available
)

echo [5/6] Checking dependencies...
if exist "node_modules" (
    echo ✅ node_modules folder exists
    if exist "node_modules\next" (
        echo ✅ Next.js installed
    ) else (
        echo ❌ Next.js not found in node_modules
        echo 💡 Running npm install...
        "C:\Program Files\nodejs\npm.cmd" install
    )
) else (
    echo ❌ node_modules not found
    echo 💡 Installing dependencies...
    "C:\Program Files\nodejs\npm.cmd" install
)

echo [6/6] Killing any stuck processes...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3000') do (
    echo Killing process %%a on port 3000...
    taskkill /PID %%a /F >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3001') do (
    echo Killing process %%a on port 3001...
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo ========================================================
echo   ATTEMPTING TO START SERVER...
echo ========================================================
echo.

echo 🚀 Method 1: Starting on port 3000...
start "ClothingDrop-3000" cmd /k "cd /d \"%CD%\" && \"C:\Program Files\nodejs\npm.cmd\" run dev"

timeout /t 5 /nobreak >nul

echo 🚀 Method 2: Starting on port 3001...
start "ClothingDrop-3001" cmd /k "cd /d \"%CD%\" && \"C:\Program Files\nodejs\npm.cmd\" run dev -- --port 3001"

timeout /t 5 /nobreak >nul

echo 🚀 Method 3: Starting with npx...
start "ClothingDrop-npx" cmd /k "cd /d \"%CD%\" && \"C:\Program Files\nodejs\npx.cmd\" next dev --port 3002"

echo.
echo ========================================================
echo   SERVERS STARTING...
echo ========================================================
echo.

echo 🌐 Try these URLs in your browser:
echo.
echo    http://localhost:3000
echo    http://localhost:3001  
echo    http://localhost:3002
echo.

echo 💡 TROUBLESHOOTING TIPS:
echo.
echo 1. Wait 30-60 seconds for servers to start
echo 2. Try all three URLs above
echo 3. Check the command windows that opened
echo 4. Look for "Ready" or "Local:" messages
echo 5. If still not working, try restarting your computer
echo.

echo 🔧 If servers don't start:
echo 1. Check Windows Firewall settings
echo 2. Try running as Administrator
echo 3. Check antivirus software
echo 4. Try different ports (3003, 3004, etc.)
echo.

echo Press any key to open browser windows...
pause >nul

start http://localhost:3000
timeout /t 2 /nobreak >nul
start http://localhost:3001
timeout /t 2 /nobreak >nul
start http://localhost:3002

echo.
echo Browser windows opened. Check if any of them work!
echo.
pause
