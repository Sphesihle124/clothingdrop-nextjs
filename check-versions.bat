@echo off
setlocal enabledelayedexpansion
title ClothingDrop - Version Check

echo.
echo ==========================================
echo  ClothingDrop - Version Information
echo ==========================================
echo.

REM Define full paths to Node.js and npm
set NODE_PATH="C:\Program Files\nodejs\node.exe"
set NPM_PATH="C:\Program Files\nodejs\npm.cmd"

echo 🔍 Checking installed versions...
echo.

echo Node.js:
%NODE_PATH% --version

echo.
echo npm:
%NPM_PATH% --version

echo.
echo Next.js:
%NPM_PATH% list next --depth=0 2>nul | findstr "next@"

echo.
echo React:
%NPM_PATH% list react --depth=0 2>nul | findstr "react@"

echo.
echo TypeScript:
%NPM_PATH% list typescript --depth=0 2>nul | findstr "typescript@"

echo.
echo Tailwind CSS:
%NPM_PATH% list tailwindcss --depth=0 2>nul | findstr "tailwindcss@"

echo.
echo ==========================================
echo ✅ All versions checked!
echo ==========================================
echo.

pause
