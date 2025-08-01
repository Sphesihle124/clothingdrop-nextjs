# 🎨 ClothingDrop Demo Customization Guide

## 🛍️ **Customize Products**

### **Add New Products**
Edit `src/app/api/products/route.ts` and `src/app/api/products/[id]/route.ts`:

```javascript
// Add to the demoProducts array:
{
  id: 7, // Use next available ID
  name: 'Your Product Name',
  description: 'Your product description here...',
  price: 999.99, // Price in Rand
  image: 'https://images.unsplash.com/photo-YOUR-IMAGE-ID?w=400&h=400&fit=crop',
  category: 'Your Category',
  sizes: ['S', 'M', 'L', 'XL'], // or ['28', '30', '32'] for jeans
  in_stock: true,
  featured: true // Shows on homepage
}
```

### **Edit Existing Products**
Change any property of existing products:
- **Name**: Product title
- **Description**: Product details
- **Price**: In South African Rand
- **Image**: Use Unsplash URLs or your own
- **Category**: T-Shirts, Jeans, Jackets, Dresses, Hoodies, Shoes
- **Sizes**: Array of available sizes
- **Featured**: true/false (shows on homepage)

### **Product Categories**
Add new categories by using them in products and updating the filter logic.

---

## 🎨 **Customize Styling & Branding**

### **Colors & Theme**
Edit `src/app/globals.css` and `tailwind.config.js`:

```css
/* Change primary colors */
:root {
  --primary-50: #eff6ff;
  --primary-600: #2563eb; /* Main brand color */
  --primary-700: #1d4ed8;
}
```

### **Logo & Brand Name**
1. **App Name**: Edit `src/app/layout.tsx`
2. **Logo**: Add logo image to `public/` folder
3. **Favicon**: Replace `public/favicon.ico`

### **Homepage Content**
Edit `src/app/page.tsx`:
- Hero section text
- Feature descriptions
- Call-to-action buttons

---

## 📝 **Customize Content**

### **Company Information**
Edit `src/components/Footer.tsx`:
- Contact details
- Address
- Phone number
- Email
- Social media links

### **About Section**
Create/edit pages:
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/shipping/page.tsx`

### **Order Tracking**
Edit demo order in `src/app/api/orders/[id]/route.ts`:
- Order details
- Customer information
- Delivery address
- Order items

---

## 🛒 **Customize Shopping Experience**

### **Currency & Pricing**
Already set to South African Rand, but you can:
- Change currency symbol in `src/lib/utils.ts`
- Adjust price formatting
- Add tax calculations

### **Delivery Information**
Edit `src/components/CheckoutForm.tsx`:
- Delivery areas
- Estimated delivery times
- Delivery fees

### **Cart Behavior**
Modify `src/components/CartProvider.tsx`:
- Default quantities
- Maximum quantities
- Cart persistence

---

## 🎯 **Add New Features**

### **Product Filters**
Add more filters in product pages:
- Price ranges
- Color options
- Brand filters
- Size availability

### **Product Variants**
Add color/style variants:
```javascript
{
  id: 8,
  name: 'Cotton T-Shirt',
  variants: [
    { color: 'White', image: 'white-tshirt.jpg' },
    { color: 'Black', image: 'black-tshirt.jpg' },
    { color: 'Navy', image: 'navy-tshirt.jpg' }
  ]
}
```

### **Promotional Banners**
Add to homepage or product pages:
- Sale announcements
- Free shipping offers
- New arrivals

---

## 🖼️ **Customize Images**

### **Product Images**
Replace Unsplash URLs with your own:
1. Add images to `public/images/products/`
2. Update image URLs in product data
3. Use format: `/images/products/your-image.jpg`

### **Hero Images**
Replace homepage hero images:
- Edit `src/app/page.tsx`
- Add images to `public/images/`

### **Category Images**
Update category display images in product data.

---

## 📱 **Customize Mobile Experience**

### **Responsive Design**
Tailwind CSS classes are already responsive, but you can:
- Adjust mobile layouts
- Change mobile navigation
- Optimize mobile images

### **Mobile-Specific Features**
- Touch-friendly buttons
- Swipe gestures
- Mobile-optimized forms

---

## 🔧 **Technical Customizations**

### **Add New Pages**
Create new pages in `src/app/`:
```
src/app/
├── about/
│   └── page.tsx
├── size-guide/
│   └── page.tsx
├── returns/
│   └── page.tsx
```

### **Custom Components**
Create reusable components in `src/components/`:
- Product cards
- Promotional banners
- Custom forms

### **API Customization**
Modify API routes in `src/app/api/`:
- Add new endpoints
- Modify existing responses
- Add data validation

---

## 🎨 **Quick Customization Examples**

### **Example 1: Add a New Product**
```javascript
// In src/app/api/products/route.ts, add to demoProducts:
{
  id: 7,
  name: 'South African Rugby Jersey',
  description: 'Official Springboks replica jersey. Show your support!',
  price: 899.99,
  image: 'https://images.unsplash.com/photo-rugby-jersey?w=400&h=400&fit=crop',
  category: 'Sports',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  in_stock: true,
  featured: true
}
```

### **Example 2: Change Brand Colors**
```css
/* In src/app/globals.css */
:root {
  --primary-600: #16a34a; /* Green for South African theme */
  --primary-700: #15803d;
}
```

### **Example 3: Add Sale Prices**
```javascript
{
  id: 1,
  name: 'Classic White T-Shirt',
  price: 549.99,
  sale_price: 399.99, // Add sale price
  on_sale: true, // Add sale flag
  // ... other properties
}
```

---

## 🚀 **Testing Your Changes**

1. **Save your changes**
2. **Restart the server**: `npm run dev`
3. **Check the browser**: http://localhost:3000
4. **Test all features** to ensure they work

---

## 📋 **Customization Checklist**

### **Basic Customization**
- [ ] Update company name and logo
- [ ] Change contact information
- [ ] Customize homepage content
- [ ] Add/edit products
- [ ] Update colors and styling

### **Advanced Customization**
- [ ] Add new product categories
- [ ] Create custom pages
- [ ] Add promotional features
- [ ] Customize mobile experience
- [ ] Add new API endpoints

### **Content Customization**
- [ ] Write product descriptions
- [ ] Add company story/about page
- [ ] Create shipping/returns policies
- [ ] Add size guides
- [ ] Update legal pages

---

## 💡 **Pro Tips**

1. **Start Small**: Make one change at a time and test
2. **Use Version Control**: Commit changes with git
3. **Keep Backups**: Save original files before editing
4. **Test Mobile**: Check how changes look on mobile
5. **Performance**: Optimize images for web

---

## 🎯 **Ready to Customize?**

**Your ClothingDrop demo is fully customizable! Start with products and styling, then add your own features and content.**

**Need help with specific customizations? Check the code comments or create new issues for guidance.**
