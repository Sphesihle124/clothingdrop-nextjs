# ClothingDrop - Traditional South African Clothing Delivery

A modern cross-platform e-commerce platform specializing in traditional South African clothing with fast delivery service.

## 🚀 **Cross-Platform Development Ready!**

ClothingDrop now supports both **web** and **mobile** platforms with shared business logic:

### **📱 Available Platforms:**
- **🌐 Web App** (Next.js) - This repository
- **📱 Mobile App** (Expo/React Native) - `../clothingdrop-mobile/`
- **🔄 Shared Code** - 80-90% code reuse between platforms

## 🌟 Features

- **Traditional South African Clothing** - Authentic Shweshwe dresses, Ndebele accessories, Zulu hats, and more
- **Fast Delivery** - Delivered to your doorstep in minutes
- **Real-time Tracking** - Track your order with live updates
- **ZAR Currency** - Professional South African Rand formatting
- **Cross-Platform** - Web and mobile apps with shared business logic
- **Responsive Design** - Works perfectly on all devices
- **Demo Mode** - Explore all features with sample data

## 🛠️ Tech Stack

### **Web App (This Repository):**
- **Next.js 14.2.30** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Database and authentication
- **Stripe** - Payment processing
- **Lucide React** - Modern icons

### **Mobile App (`../clothingdrop-mobile/`):**
- **Expo SDK** - React Native development platform
- **React Native** - Cross-platform mobile framework
- **TypeScript** - Shared type definitions
- **Expo Router** - File-based navigation

### **Shared Business Logic:**
- **Contexts** - CartContext, OrderContext, AuthContext
- **Utilities** - Price formatting, validation, order generation
- **API Integration** - Supabase, Stripe, product management
- **Type Definitions** - Shared TypeScript interfaces

## 🚀 Quick Start

### **Web App:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

### **Mobile App:**
```bash
# Navigate to mobile app
cd ../clothingdrop-mobile

# Start Expo development server
npm run web      # Web version (easiest for testing)
npm run android  # Android (requires Android Studio)
npm run ios      # iOS (requires Xcode - Mac only)
```

## 📱 Cross-Platform Architecture

### **Reusable Components (80-90%):**
```typescript
// Shared business logic
src/contexts/
├── CartContext.tsx      # Shopping cart management
├── OrderContext.tsx     # Order creation and tracking
└── AuthContext.tsx      # User authentication

src/lib/
├── utils.ts            # Price formatting, validation
├── priceUtils.ts       # ZAR currency handling
└── supabase.ts         # Database integration
```

### **Platform-Specific UI (10-20%):**
```typescript
// Web (Next.js)
src/components/
├── ProductCard.tsx     # Web-optimized product display
├── Header.tsx          # Desktop navigation
└── CheckoutForm.tsx    # Web checkout flow

// Mobile (React Native)
components/
├── ProductCard.native.tsx  # Touch-optimized product display
├── TabNavigation.tsx       # Mobile navigation
└── CheckoutScreen.tsx      # Mobile checkout flow
```

## 🧪 Testing

### **Web App:**
```bash
npm test              # Run test suite
npm run test:watch    # Watch mode
```

### **Mobile App:**
```bash
cd ../clothingdrop-mobile
expo test            # Run mobile tests
```

## 🎯 Development Roadmap

### **Phase 1: Shared Logic Extraction (Completed)**
- ✅ Extract business logic to shared packages
- ✅ Create mobile app with Expo
- ✅ Setup TypeScript configuration

### **Phase 2: Mobile UI Implementation (Next)**
- 🔄 Implement core mobile screens
- 🔄 Add React Navigation
- 🔄 Mobile-specific components

### **Phase 3: Advanced Features**
- 📱 Push notifications
- 📍 GPS tracking
- 📷 Camera integration
- 🔒 Biometric authentication

## 🌍 South African Focus

- **ZAR Currency** - Professional Rand formatting (R1,234.56)
- **Local Delivery** - Johannesburg and Cape Town
- **Cultural Products** - Traditional clothing and accessories
- **Local Payment** - South African payment gateways

## 📞 Support

- **Email**: support@clothingdrop.co.za
- **Demo Order**: Use "CD-2024-001" for tracking demo
- **Location**: Sandton, Johannesburg

## 🔗 Related Repositories

- **Web App**: This repository
- **Mobile App**: `../clothingdrop-mobile/` (Expo/React Native)
- **Shared Packages**: Coming soon (monorepo structure)

---

**Ready for production deployment on both web and mobile platforms!** 🇿🇦✨
