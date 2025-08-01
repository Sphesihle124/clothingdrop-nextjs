@echo off
title ClothingDrop - Node.js Direct Start

echo.
echo ==========================================
echo  ClothingDrop - Direct Node.js Start
echo ==========================================
echo.

cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

echo 🚀 Starting with Node.js script...
"C:\Program Files\nodejs\node.exe" start-server.js

echo.
echo Server stopped.
pause
