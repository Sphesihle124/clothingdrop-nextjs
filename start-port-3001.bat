@echo off
title ClothingDrop - Port 3001

echo.
echo ==========================================
echo  ClothingDrop - Starting on Port 3001
echo ==========================================
echo.

cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

echo 🚀 Starting ClothingDrop on port 3001...
echo 🌐 Open browser to: http://localhost:3001
echo 🛑 Press Ctrl+C to stop server
echo.

"C:\Program Files\nodejs\npm.cmd" run dev -- --port 3001

echo.
echo Server stopped.
pause
