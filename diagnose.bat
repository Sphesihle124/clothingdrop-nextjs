@echo off
title ClothingDrop - Diagnostics

echo.
echo ==========================================
echo  ClothingDrop - Connection Diagnostics
echo ==========================================
echo.

cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

echo 🔍 Checking Node.js...
"C:\Program Files\nodejs\node.exe" --version
echo.

echo 🔍 Checking npm...
"C:\Program Files\nodejs\npm.cmd" --version
echo.

echo 🔍 Checking if port 3000 is in use...
netstat -ano | findstr :3000
if %errorlevel% equ 0 (
    echo ⚠️  Port 3000 is in use!
) else (
    echo ✅ Port 3000 is available
)
echo.

echo 🔍 Checking package.json...
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found
)
echo.

echo 🔍 Checking node_modules...
if exist "node_modules" (
    echo ✅ node_modules folder found
) else (
    echo ❌ node_modules folder not found - run npm install
)
echo.

echo 🔍 Checking Next.js installation...
if exist "node_modules\next" (
    echo ✅ Next.js found in node_modules
) else (
    echo ❌ Next.js not found - run npm install
)
echo.

echo ==========================================
echo 💡 Suggested Actions:
echo.
echo 1. If port 3000 is in use, try: npm run dev -- --port 3001
echo 2. If node_modules missing, run: npm install
echo 3. Try running: npm run dev
echo 4. Or use: npx next dev
echo ==========================================
echo.

pause
