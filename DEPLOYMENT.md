# ClothingDrop - Deployment & Access Guide

## 🚀 How to Access and View the App

### Prerequisites
1. **Install Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

### Quick Start (Local Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your credentials (see setup instructions below)

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the App**
   - Open your browser and go to: **http://localhost:3000**
   - The app will be running with hot reload enabled

### 🎯 App Features You Can Test

#### Without Setup (Mock Data)
- ✅ Browse products catalog
- ✅ Add items to cart
- ✅ View cart and checkout flow
- ✅ Track orders (use order ID: "CD-2024-001")
- ✅ User interface and navigation
- ✅ Responsive design on mobile/desktop

#### With Full Setup (Real Functionality)
- 🔐 User registration and login
- 💳 Real payment processing
- 📦 Order management
- 📧 Email notifications
- 🗄️ Database persistence

## 🛠️ Full Setup Instructions

### 1. Database Setup (Supabase)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Run Database Scripts**
   - In Supabase SQL Editor, run:
     1. `database/schema.sql` (creates tables)
     2. `database/seed.sql` (adds sample data)
     3. `database/policies.sql` (sets up security)

3. **Get API Keys**
   - Go to Settings > API
   - Copy your project URL and anon key

### 2. Payment Setup (Stripe)

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Get your publishable and secret keys

2. **Test Cards**
   - Use `4242 4242 4242 4242` for testing
   - Any future date and CVC

### 3. Environment Configuration

Update `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
```

## 🌐 Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Update Environment URLs**
   - Update `NEXTAUTH_URL` to your Vercel domain
   - Update Stripe webhook endpoints

### Alternative Deployment Options

- **Netlify**: Similar to Vercel, great for static sites
- **Railway**: Good for full-stack apps with databases
- **DigitalOcean App Platform**: Scalable cloud deployment
- **AWS Amplify**: Enterprise-grade deployment

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📱 App Structure & Navigation

### Main Pages
- **Home** (`/`) - Landing page with features
- **Products** (`/products`) - Product catalog with search/filter
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Payment processing
- **Track** (`/track`) - Order tracking
- **Login** (`/login`) - Authentication

### Key Features
- **Responsive Design** - Works on all devices
- **Real-time Updates** - Live order tracking
- **Secure Payments** - Stripe integration
- **User Authentication** - Supabase Auth
- **Fast Performance** - Next.js optimization

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 📞 Support

If you encounter any issues:

1. **Check the console** for error messages
2. **Verify environment variables** are set correctly
3. **Ensure all dependencies** are installed
4. **Check database connection** in Supabase
5. **Verify Stripe keys** are correct

## 🎉 Demo Credentials

For testing purposes, you can use:

- **Order Tracking**: Enter "CD-2024-001"
- **Test Payment**: Use Stripe test card `4242 4242 4242 4242`
- **Sample Products**: Pre-loaded in the database

---

**Ready to start?** Run `npm install && npm run dev` and visit http://localhost:3000! 🚀
