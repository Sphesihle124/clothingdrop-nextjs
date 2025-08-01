@echo off
title ClothingDrop - Switch to Full Version
color 0E

echo.
echo ========================================================
echo   ClothingDrop - Switch to Full Version
echo ========================================================
echo.

echo 📊 CURRENT STATUS: Demo Mode
echo.
echo 🎯 TO GET FULL VERSION:
echo.
echo 1. Set up Supabase Database (REQUIRED)
echo    - Go to supabase.com
echo    - Create new project
echo    - Run database/setup-full-database.sql
echo    - Update .env.local with real credentials
echo.
echo 2. Set up Stripe Payments (OPTIONAL)
echo    - Go to stripe.com
echo    - Get API keys
echo    - Update .env.local
echo.
echo 3. Set up Email Service (OPTIONAL)
echo    - Configure SMTP settings
echo    - Update .env.local
echo.

echo ========================================================
echo   WHAT YOU'LL GET IN FULL VERSION:
echo ========================================================
echo.
echo ✅ Complete Product Catalog (16+ products)
echo ✅ User Registration ^& Login
echo ✅ Real Shopping Cart (persistent)
echo ✅ Order Management ^& Tracking
echo ✅ Payment Processing (Stripe)
echo ✅ User Profiles ^& Addresses
echo ✅ Product Reviews ^& Ratings
echo ✅ Wishlist Functionality
echo ✅ Admin Panel
echo ✅ Email Notifications
echo.

echo ========================================================
echo   QUICK START (MINIMUM SETUP):
echo ========================================================
echo.
echo 1. ⭐ Set up Supabase (REQUIRED)
echo 2. ⏭️  Skip Stripe for now
echo 3. ⏭️  Skip email for now
echo.
echo This gives you 80%% of full features!
echo.

echo ========================================================
echo   NEXT STEPS:
echo ========================================================
echo.
echo 📖 1. Read FULL-VERSION-SETUP.md for detailed guide
echo 🗄️  2. Set up Supabase database
echo 🔧 3. Update .env.local with real credentials
echo 🚀 4. Restart server: npm run dev
echo.

echo Press any key to open setup guide...
pause >nul

start FULL-VERSION-SETUP.md

echo.
echo Setup guide opened! Follow the steps to upgrade.
echo.
pause
