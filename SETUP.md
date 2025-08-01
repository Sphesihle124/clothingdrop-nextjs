# ClothingDrop Setup Guide

## Prerequisites Installation

### 1. Install Node.js and npm

**Windows:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. Verify installation by opening PowerShell/Command Prompt and running:
   ```
   node --version
   npm --version
   ```

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Dependencies

Once Node.js is installed, run:
```bash
npm install
```

### 3. Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

2. Set up Supabase (Database & Auth):
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from Settings > API
   - Update `.env.local` with your Supabase credentials

3. Set up Stripe (Payments):
   - Go to [stripe.com](https://stripe.com)
   - Create an account and get your API keys
   - Update `.env.local` with your Stripe keys

### 4. Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  sizes TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(20),
  address JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_address JSONB,
  driver_name VARCHAR(255),
  driver_phone VARCHAR(20),
  estimated_delivery TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(255),
  price DECIMAL(10,2),
  size VARCHAR(10),
  quantity INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample products
INSERT INTO products (name, description, price, image, category, sizes) VALUES
('Classic White T-Shirt', 'Comfortable cotton t-shirt', 29.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', 'T-Shirts', ARRAY['S', 'M', 'L', 'XL']),
('Denim Jacket', 'Vintage style denim jacket', 89.99, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop', 'Jackets', ARRAY['S', 'M', 'L', 'XL']),
('Black Jeans', 'Slim fit black jeans', 79.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', 'Jeans', ARRAY['28', '30', '32', '34', '36']),
('Summer Dress', 'Light and airy summer dress', 59.99, 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop', 'Dresses', ARRAY['XS', 'S', 'M', 'L']),
('Hoodie', 'Comfortable pullover hoodie', 49.99, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', 'Hoodies', ARRAY['S', 'M', 'L', 'XL', 'XXL']),
('Sneakers', 'Comfortable running sneakers', 129.99, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', 'Shoes', ARRAY['7', '8', '9', '10', '11', '12']);
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Features Available

✅ **Completed:**
- Home page with hero section and features
- Product catalog with search and filtering
- Shopping cart functionality
- Order tracking system
- User authentication UI
- Responsive design
- TypeScript support
- Tailwind CSS styling

🚧 **Next Steps:**
- Database integration
- Real authentication
- Payment processing
- API routes
- Real-time tracking
- Email notifications

## Troubleshooting

**Common Issues:**

1. **Node.js not found**: Make sure Node.js is installed and added to your PATH
2. **Port 3000 in use**: Use `npm run dev -- -p 3001` to run on a different port
3. **Environment variables**: Make sure `.env.local` is properly configured
4. **Supabase connection**: Verify your Supabase URL and keys are correct

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```
