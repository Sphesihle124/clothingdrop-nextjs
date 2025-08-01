@echo off
title ClothingDrop - Install Everything for GitHub
color 0A

echo.
echo ========================================================
echo   ClothingDrop - Installing Everything for GitHub
echo   (Automated installation of all required tools)
echo ========================================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

echo 🔍 Checking what needs to be installed...
echo.

REM Check if Chocolatey is installed (package manager for Windows)
echo [1/5] Checking Chocolatey (Windows package manager)...
choco --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Chocolatey not found - installing...
    echo.
    echo 📥 Installing Chocolatey...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    if %errorlevel% neq 0 (
        echo ⚠️  Chocolatey installation failed, trying manual Git installation...
        goto MANUAL_GIT
    )
    echo ✅ Chocolatey installed successfully!
    echo.
    REM Refresh environment variables
    call refreshenv
) else (
    for /f "tokens=*" %%i in ('choco --version') do set CHOCO_VERSION=%%i
    echo ✅ Chocolatey found: %CHOCO_VERSION%
    echo.
)

REM Check if Git is installed
echo [2/5] Checking Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git not found - installing...
    echo.
    echo 📥 Installing Git with Chocolatey...
    choco install git -y
    if %errorlevel% neq 0 (
        echo ⚠️  Chocolatey Git installation failed, trying manual...
        goto MANUAL_GIT
    )
    echo ✅ Git installed successfully!
    echo.
    REM Refresh environment variables
    call refreshenv
) else (
    for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
    echo ✅ Git found: %GIT_VERSION%
    echo.
)

goto GIT_SETUP

:MANUAL_GIT
echo.
echo 📥 Manual Git Installation Required
echo.
echo Please install Git manually:
echo 1. Go to: https://git-scm.com/download/windows
echo 2. Download and install Git
echo 3. Use default settings
echo 4. Restart computer
echo 5. Run this script again
echo.
start https://git-scm.com/download/windows
pause
exit /b 1

:GIT_SETUP
REM Check if GitHub CLI is installed (optional but helpful)
echo [3/5] Checking GitHub CLI (optional)...
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ GitHub CLI not found - installing...
    echo.
    echo 📥 Installing GitHub CLI with Chocolatey...
    choco install gh -y
    if %errorlevel% neq 0 (
        echo ⚠️  GitHub CLI installation failed (optional, continuing...)
    ) else (
        echo ✅ GitHub CLI installed successfully!
        echo.
        call refreshenv
    )
) else (
    for /f "tokens=*" %%i in ('gh --version') do set GH_VERSION=%%i
    echo ✅ GitHub CLI found: %GH_VERSION%
    echo.
)

REM Check if VS Code is installed (optional but recommended)
echo [4/5] Checking VS Code (optional)...
code --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ VS Code not found - installing...
    echo.
    echo 📥 Installing VS Code with Chocolatey...
    choco install vscode -y
    if %errorlevel% neq 0 (
        echo ⚠️  VS Code installation failed (optional, continuing...)
    ) else (
        echo ✅ VS Code installed successfully!
        echo.
        call refreshenv
    )
) else (
    for /f "tokens=*" %%i in ('code --version') do set CODE_VERSION=%%i
    echo ✅ VS Code found: %CODE_VERSION%
    echo.
)

REM Initialize Git repository
echo [5/5] Setting up Git repository...
if exist ".git" (
    echo ✅ Git repository already exists
    echo.
) else (
    echo 🔧 Initializing Git repository...
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
    echo # Dependencies> .gitignore
    echo node_modules/>> .gitignore
    echo npm-debug.log*>> .gitignore
    echo yarn-debug.log*>> .gitignore
    echo yarn-error.log*>> .gitignore
    echo.>> .gitignore
    echo # Next.js>> .gitignore
    echo .next/>> .gitignore
    echo out/>> .gitignore
    echo build/>> .gitignore
    echo.>> .gitignore
    echo # Environment variables>> .gitignore
    echo .env>> .gitignore
    echo .env.local>> .gitignore
    echo .env.development.local>> .gitignore
    echo .env.test.local>> .gitignore
    echo .env.production.local>> .gitignore
    echo.>> .gitignore
    echo # IDE>> .gitignore
    echo .vscode/>> .gitignore
    echo .idea/>> .gitignore
    echo *.swp>> .gitignore
    echo *.swo>> .gitignore
    echo.>> .gitignore
    echo # OS>> .gitignore
    echo .DS_Store>> .gitignore
    echo Thumbs.db>> .gitignore
    echo desktop.ini>> .gitignore
    echo.>> .gitignore
    echo # Logs>> .gitignore
    echo *.log>> .gitignore
    echo logs/>> .gitignore
    echo.>> .gitignore
    echo # Runtime data>> .gitignore
    echo pids>> .gitignore
    echo *.pid>> .gitignore
    echo *.seed>> .gitignore
    echo *.pid.lock>> .gitignore
    echo.>> .gitignore
    echo # Coverage directory used by tools like istanbul>> .gitignore
    echo coverage/>> .gitignore
    echo *.lcov>> .gitignore
    echo.>> .gitignore
    echo # Dependency directories>> .gitignore
    echo jspm_packages/>> .gitignore
    echo.>> .gitignore
    echo # Optional npm cache directory>> .gitignore
    echo .npm>> .gitignore
    echo.>> .gitignore
    echo # Optional eslint cache>> .gitignore
    echo .eslintcache>> .gitignore
    echo.>> .gitignore
    echo # Temporary folders>> .gitignore
    echo tmp/>> .gitignore
    echo temp/>> .gitignore
    echo ✅ .gitignore created
    echo.
) else (
    echo ✅ .gitignore already exists
    echo.
)

echo ========================================================
echo   🎉 INSTALLATION COMPLETE!
echo ========================================================
echo.

echo ✅ All tools installed successfully:
echo    - Git (version control)
echo    - GitHub CLI (optional)
echo    - VS Code (optional)
echo    - Git repository initialized
echo    - .gitignore file created
echo.

echo 🎯 Next steps:
echo.
echo 1. Configure Git with your details:
echo    git config --global user.name "Your Name"
echo    git config --global user.email "your.email@example.com"
echo.
echo 2. Add files to Git:
echo    git add .
echo    git commit -m "Initial commit: ClothingDrop SA e-commerce platform"
echo.
echo 3. Create GitHub repository:
echo    - Go to https://github.com/new
echo    - Repository name: clothingdrop-sa
echo    - Description: South African e-commerce platform
echo    - Make it PUBLIC
echo    - Don't initialize with README
echo    - Click "Create repository"
echo.
echo 4. Push to GitHub:
echo    git remote add origin https://github.com/YOUR_USERNAME/clothingdrop-sa.git
echo    git branch -M main
echo    git push -u origin main
echo.

echo ========================================================
echo   🚀 READY TO PUBLISH TO GITHUB!
echo ========================================================
echo.

echo Press any key to open GitHub in your browser...
pause >nul

start https://github.com/new

echo.
echo 🌐 GitHub opened in browser!
echo.
echo 💡 Follow the steps above to complete the publication.
echo.
echo Your ClothingDrop app is ready to be shared with the world! 🇿🇦🚀
echo.

pause
