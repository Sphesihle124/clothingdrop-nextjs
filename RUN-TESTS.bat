@echo off
title ClothingDrop - Run Tests
color 0A

echo.
echo ========================================================
echo   ClothingDrop - Testing Suite
echo   (Back testing and transaction simulation)
echo ========================================================
echo.

REM Change to project directory
cd /d "%~dp0"

echo 📁 Current directory: %CD%
echo.

echo 🧪 Available Testing Options:
echo.
echo [1] Unit Tests (Jest)
echo [2] Integration Tests
echo [3] E2E Tests (if Cypress installed)
echo [4] Load Testing Dashboard
echo [5] Performance Testing
echo [6] Transaction Simulation
echo [7] All Tests
echo [0] Exit
echo.

set /p choice="Select testing option (0-7): "

if "%choice%"=="1" goto UNIT_TESTS
if "%choice%"=="2" goto INTEGRATION_TESTS
if "%choice%"=="3" goto E2E_TESTS
if "%choice%"=="4" goto LOAD_TESTING
if "%choice%"=="5" goto PERFORMANCE_TESTS
if "%choice%"=="6" goto TRANSACTION_SIM
if "%choice%"=="7" goto ALL_TESTS
if "%choice%"=="0" goto EXIT
goto INVALID_CHOICE

:UNIT_TESTS
echo.
echo 🔬 Running Unit Tests...
echo.
npm test
goto END

:INTEGRATION_TESTS
echo.
echo 🔗 Running Integration Tests...
echo.
npm run test:integration
if %errorlevel% neq 0 (
    echo ⚠️  Integration tests not configured yet
    echo 💡 Run: npm install --save-dev supertest
)
goto END

:E2E_TESTS
echo.
echo 🌐 Running E2E Tests...
echo.
npx cypress run
if %errorlevel% neq 0 (
    echo ⚠️  Cypress not installed
    echo 💡 Run: npm install --save-dev cypress
    echo 💡 Then: npx cypress open
)
goto END

:LOAD_TESTING
echo.
echo 📊 Starting Load Testing Dashboard...
echo.
echo 🚀 Starting development server...
start "ClothingDrop Server" cmd /k "npm run dev"
echo.
echo ⏳ Waiting for server to start...
timeout /t 10 /nobreak >nul
echo.
echo 🌐 Opening testing dashboard...
start http://localhost:3000/testing
echo.
echo ✅ Testing dashboard opened!
echo    - Configure test parameters
echo    - Run load tests
echo    - Monitor real-time results
echo.
goto END

:PERFORMANCE_TESTS
echo.
echo ⚡ Running Performance Tests...
echo.
echo 🔍 Checking if Lighthouse is installed...
npx lighthouse --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Installing Lighthouse...
    npm install -g lighthouse
)
echo.
echo 🚀 Starting server for performance testing...
start "ClothingDrop Server" cmd /k "npm run dev"
echo.
echo ⏳ Waiting for server to start...
timeout /t 15 /nobreak >nul
echo.
echo 📊 Running Lighthouse performance audit...
npx lighthouse http://localhost:3000 --output html --output-path lighthouse-report.html
echo.
echo ✅ Performance report generated: lighthouse-report.html
start lighthouse-report.html
goto END

:TRANSACTION_SIM
echo.
echo 💳 Running Transaction Simulation...
echo.
echo 🚀 Starting server...
start "ClothingDrop Server" cmd /k "npm run dev"
echo.
echo ⏳ Waiting for server to start...
timeout /t 10 /nobreak >nul
echo.
echo 🧪 Opening testing dashboard for transaction simulation...
start http://localhost:3000/testing
echo.
echo 💡 Transaction Simulation Options:
echo    - Single Transaction Test
echo    - Load Testing (multiple concurrent users)
echo    - Custom scenarios
echo.
echo 📊 Monitor results in real-time on the dashboard
goto END

:ALL_TESTS
echo.
echo 🎯 Running All Tests...
echo.
echo [1/4] Unit Tests...
npm test -- --watchAll=false
echo.
echo [2/4] Build Test...
npm run build
echo.
echo [3/4] Starting server for integration tests...
start "ClothingDrop Server" cmd /k "npm run dev"
timeout /t 15 /nobreak >nul
echo.
echo [4/4] Opening testing dashboard...
start http://localhost:3000/testing
echo.
echo ✅ All tests initiated!
goto END

:INVALID_CHOICE
echo.
echo ❌ Invalid choice. Please select 0-7.
echo.
pause
goto :eof

:END
echo.
echo ========================================================
echo   Testing Complete!
echo ========================================================
echo.
echo 📊 Test Results Summary:
echo    - Check console output for test results
echo    - View lighthouse-report.html for performance
echo    - Use testing dashboard for load testing
echo.
echo 💡 Next Steps:
echo    1. Review test results
echo    2. Fix any failing tests
echo    3. Optimize performance issues
echo    4. Run tests again to verify fixes
echo.

:EXIT
echo Press any key to exit...
pause >nul
