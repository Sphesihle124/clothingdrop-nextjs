@echo off
title ClothingDrop - PowerShell Bypass

echo.
echo ==========================================
echo  ClothingDrop - PowerShell Bypass
echo ==========================================
echo.

echo 🔧 Running with PowerShell execution policy bypass...
echo.

REM Run PowerShell script with bypass policy
powershell.exe -ExecutionPolicy Bypass -File "%~dp0start-app-bypass.ps1"

echo.
echo Script completed.
pause
