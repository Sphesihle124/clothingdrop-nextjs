@echo off
title ClothingDrop - Publish to GitHub
color 0E

echo.
echo ========================================================
echo   ClothingDrop - Publish to GitHub
echo   (Automated Git setup and GitHub publishing)
echo ========================================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

REM Check if Git is installed
echo 🔍 Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo.
    echo 📥 Please install Git first:
    echo    1. Go to https://git-scm.com/download/windows
    echo    2. Download and install Git
    echo    3. Restart computer
    echo    4. Run this script again
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('git --version') do set GIT_VERSION=%%i
echo ✅ Git found: %GIT_VERSION%
echo.

REM Check if already a Git repository
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

REM Check Git configuration
echo 🔍 Checking Git configuration...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Git user not configured
    echo.
    set /p USERNAME="Enter your name: "
    set /p EMAIL="Enter your email: "
    git config --global user.name "!USERNAME!"
    git config --global user.email "!EMAIL!"
    echo ✅ Git user configured
    echo.
) else (
    for /f "tokens=*" %%i in ('git config user.name') do set CURRENT_USER=%%i
    for /f "tokens=*" %%i in ('git config user.email') do set CURRENT_EMAIL=%%i
    echo ✅ Git configured for: !CURRENT_USER! ^<!CURRENT_EMAIL!^>
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

REM Add files to Git
echo 📦 Adding files to Git...
git add .
if %errorlevel% neq 0 (
    echo ❌ Failed to add files to Git
    pause
    exit /b 1
)
echo ✅ Files added to Git
echo.

REM Check if there are changes to commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo ✅ No new changes to commit
    echo.
) else (
    echo 💾 Creating commit...
    git commit -m "ClothingDrop: South African e-commerce platform with demo features"
    if %errorlevel% neq 0 (
        echo ❌ Failed to create commit
        pause
        exit /b 1
    )
    echo ✅ Commit created successfully
    echo.
)

echo ========================================================
echo   🎯 READY TO PUBLISH TO GITHUB!
echo ========================================================
echo.

echo 📋 Next steps:
echo.
echo 1. 🌐 Create GitHub repository:
echo    - Go to https://github.com/new
echo    - Repository name: clothingdrop-sa
echo    - Description: South African e-commerce platform
echo    - Make it PUBLIC
echo    - DON'T initialize with README
echo    - Click "Create repository"
echo.

echo 2. 🔗 Connect to GitHub:
echo    Copy and paste these commands in a new terminal:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/clothingdrop-sa.git
echo    git branch -M main
echo    git push -u origin main
echo.

echo 3. 🎉 Your app will be live on GitHub!
echo.

echo ========================================================
echo   📊 WHAT YOU'RE PUBLISHING:
echo ========================================================
echo.

echo ✅ Complete Next.js e-commerce application
echo ✅ 6 demo products with ZAR pricing
echo ✅ Shopping cart and order tracking
echo ✅ South African localization
echo ✅ Professional documentation
echo ✅ TypeScript and Tailwind CSS
echo ✅ API routes and components
echo ✅ Mobile responsive design
echo.

echo 🌟 This will be an excellent portfolio project!
echo.

echo Press any key to open GitHub in your browser...
pause >nul

start https://github.com/new

echo.
echo 🚀 GitHub opened in browser!
echo.
echo 💡 After creating the repository:
echo    1. Copy the repository URL
echo    2. Run the git commands shown above
echo    3. Your ClothingDrop app will be live!
echo.

echo Press any key to exit...
pause >nul
