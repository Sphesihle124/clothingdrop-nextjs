@echo off
title ClothingDrop - Install Git Directly
color 0A

echo.
echo ========================================================
echo   ClothingDrop - Installing Git Directly
echo   (Direct download and installation)
echo ========================================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

REM Check if Git is already installed
echo 🔍 Checking if Git is already installed...
git --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo ✅ Git is already installed: %GIT_VERSION%
    goto GIT_SETUP
)

echo ❌ Git not found - downloading and installing...
echo.

REM Create temp directory
if not exist "temp" mkdir temp

echo 📥 Downloading Git for Windows...
echo    This may take a few minutes depending on your internet speed...
echo.

REM Download Git using PowerShell
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/Git-2.47.1-64-bit.exe' -OutFile 'temp\Git-Installer.exe'}"

if not exist "temp\Git-Installer.exe" (
    echo ❌ Failed to download Git installer
    echo.
    echo 💡 Please download Git manually:
    echo    1. Go to: https://git-scm.com/download/windows
    echo    2. Download and install Git
    echo    3. Use default settings
    echo    4. Restart computer
    echo    5. Run this script again
    echo.
    start https://git-scm.com/download/windows
    pause
    exit /b 1
)

echo ✅ Git installer downloaded successfully!
echo.

echo 🔧 Installing Git...
echo    Please follow the installation wizard:
echo    - Use DEFAULT settings for everything
echo    - Make sure "Add Git to PATH" is checked
echo    - Complete the installation
echo.

REM Run Git installer
start /wait "temp\Git-Installer.exe"

echo.
echo ⏳ Waiting for Git installation to complete...
echo    Please complete the installation and then press any key...
pause

REM Clean up
if exist "temp\Git-Installer.exe" del "temp\Git-Installer.exe"
if exist "temp" rmdir "temp"

echo.
echo 🔍 Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git installation failed or PATH not updated
    echo.
    echo 💡 Please:
    echo    1. Restart your computer
    echo    2. Run this script again
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
echo ✅ Git installed successfully: %GIT_VERSION%
echo.

:GIT_SETUP
echo 🔧 Setting up Git repository...

REM Initialize Git repository
if exist ".git" (
    echo ✅ Git repository already exists
    echo.
) else (
    echo 📝 Initializing Git repository...
    git init
    if %errorlevel% neq 0 (
        echo ❌ Failed to initialize Git repository
        pause
        exit /b 1
    )
    echo ✅ Git repository initialized
    echo.
)

REM Create .gitignore if it doesn't exist
if not exist ".gitignore" (
    echo 📝 Creating .gitignore file...
    (
        echo # Dependencies
        echo node_modules/
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
        echo.
        echo # Next.js
        echo .next/
        echo out/
        echo build/
        echo.
        echo # Environment variables
        echo .env
        echo .env.local
        echo .env.development.local
        echo .env.test.local
        echo .env.production.local
        echo.
        echo # IDE
        echo .vscode/
        echo .idea/
        echo *.swp
        echo *.swo
        echo.
        echo # OS
        echo .DS_Store
        echo Thumbs.db
        echo desktop.ini
        echo.
        echo # Logs
        echo *.log
        echo logs/
        echo.
        echo # Runtime data
        echo pids
        echo *.pid
        echo *.seed
        echo *.pid.lock
        echo.
        echo # Coverage directory
        echo coverage/
        echo *.lcov
        echo.
        echo # Dependency directories
        echo jspm_packages/
        echo.
        echo # Optional npm cache
        echo .npm
        echo.
        echo # Optional eslint cache
        echo .eslintcache
        echo.
        echo # Temporary folders
        echo tmp/
        echo temp/
    ) > .gitignore
    echo ✅ .gitignore created
    echo.
) else (
    echo ✅ .gitignore already exists
    echo.
)

echo ========================================================
echo   🎉 GIT SETUP COMPLETE!
echo ========================================================
echo.

echo ✅ Git is ready for GitHub publication!
echo.

echo 🎯 Next steps:
echo.
echo 1. I need your Git configuration details:
echo.
set /p USERNAME="Enter your name (for Git commits): "
set /p EMAIL="Enter your email address: "

echo.
echo 🔧 Configuring Git with your details...
git config --global user.name "%USERNAME%"
git config --global user.email "%EMAIL%"

echo ✅ Git configured for: %USERNAME% <%EMAIL%>
echo.

echo 📦 Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ❌ Failed to add files to Git
    pause
    exit /b 1
)
echo ✅ Files added to Git
echo.

echo 💾 Creating initial commit...
git commit -m "Initial commit: ClothingDrop South African e-commerce platform"
if %errorlevel% neq 0 (
    echo ❌ Failed to create commit
    pause
    exit /b 1
)
echo ✅ Initial commit created
echo.

echo ========================================================
echo   🚀 READY FOR GITHUB!
echo ========================================================
echo.

echo 🌐 Opening GitHub to create repository...
echo.
echo 📋 Repository details to use:
echo    Name: clothingdrop-sa
echo    Description: South African e-commerce platform with fast delivery
echo    Visibility: PUBLIC
echo    Initialize: DON'T check any boxes (we have files)
echo.

start https://github.com/new

echo.
echo ⏳ After creating the repository on GitHub:
echo.
echo 🔗 Copy and paste these commands in a new terminal:
echo.
echo git remote add origin https://github.com/YOUR_USERNAME/clothingdrop-sa.git
echo git branch -M main
echo git push -u origin main
echo.
echo (Replace YOUR_USERNAME with your actual GitHub username)
echo.

echo 🎉 Your ClothingDrop app will then be live on GitHub! 🇿🇦🚀
echo.

pause
