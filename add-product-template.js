// ClothingDrop - Add New Product Template
// Copy this template and add it to the demoProducts array in:
// - src/app/api/products/route.ts
// - src/app/api/products/[id]/route.ts

// TEMPLATE - Replace with your product details
const newProductTemplate = {
  id: 7, // Use next available ID (current max is 6)
  name: 'Your Product Name Here',
  description: 'Detailed product description. Mention materials, fit, style, and key features.',
  price: 999.99, // Price in South African Rand
  image: 'https://images.unsplash.com/photo-YOUR-IMAGE-ID?w=400&h=400&fit=crop',
  category: 'T-Shirts', // Options: T-Shirts, Jeans, Jackets, Dresses, Hoodies, Shoes
  sizes: ['S', 'M', 'L', 'XL'], // For clothing: ['S', 'M', 'L', 'XL'] or for jeans: ['28', '30', '32', '34', '36']
  in_stock: true,
  featured: true // true = shows on homepage, false = only in catalog
}

// EXAMPLES - Ready to use products

// Example 1: South African themed product
const springboksJersey = {
  id: 7,
  name: 'Springboks Rugby Jersey',
  description: 'Official South African rugby team replica jersey. Premium quality fabric with moisture-wicking technology. Perfect for match days or casual wear.',
  price: 1299.99,
  image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
  category: 'Sports',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  in_stock: true,
  featured: true
}

// Example 2: Local fashion
const africanPrintDress = {
  id: 8,
  name: 'African Print Maxi Dress',
  description: 'Beautiful traditional African print maxi dress. Handcrafted with authentic wax print fabric. Perfect for special occasions or cultural events.',
  price: 1899.99,
  image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
  category: 'Dresses',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  in_stock: true,
  featured: true
}

// Example 3: Winter wear
const woolJumper = {
  id: 9,
  name: 'Merino Wool Jumper',
  description: 'Premium merino wool jumper perfect for Johannesburg winters. Soft, warm, and naturally odor-resistant. Classic fit suitable for work or casual wear.',
  price: 2199.99,
  image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
  category: 'Knitwear',
  sizes: ['S', 'M', 'L', 'XL'],
  in_stock: true,
  featured: false
}

// Example 4: Accessories
const leatherBelt = {
  id: 10,
  name: 'Genuine Leather Belt',
  description: 'Handcrafted genuine leather belt made from premium South African leather. Classic brown color with antique brass buckle. Perfect for formal and casual wear.',
  price: 599.99,
  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  category: 'Accessories',
  sizes: ['32', '34', '36', '38', '40', '42'],
  in_stock: true,
  featured: false
}

// Example 5: Summer wear
const linenshorts = {
  id: 11,
  name: 'Linen Summer Shorts',
  description: 'Lightweight linen shorts perfect for hot South African summers. Breathable fabric with comfortable elastic waistband. Ideal for beach days or casual outings.',
  price: 749.99,
  image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
  category: 'Shorts',
  sizes: ['S', 'M', 'L', 'XL'],
  in_stock: true,
  featured: false
}

// HOW TO ADD THESE PRODUCTS:

// 1. Open src/app/api/products/route.ts
// 2. Find the demoProducts array (around line 11)
// 3. Add your new product object to the array
// 4. Make sure to use a unique ID number
// 5. Save the file

// 6. Open src/app/api/products/[id]/route.ts
// 7. Find the demoProducts array (around line 11)
// 8. Add the same product object to this array too
// 9. Save the file

// 10. Restart your server: npm run dev
// 11. Check http://localhost:3000 to see your new products

// TIPS:
// - Use Unsplash for free product images
// - Keep descriptions detailed but concise
// - Price in South African Rand (current products range from R459-R2399)
// - Categories help with filtering
// - Featured products appear on the homepage
// - Make sure sizes are appropriate for the product type

// CATEGORIES YOU CAN USE:
// - T-Shirts
// - Jeans  
// - Jackets
// - Dresses
// - Hoodies
// - Shoes
// - Sports (new)
// - Knitwear (new)
// - Accessories (new)
// - Shorts (new)
// - Or create your own!

console.log('Product templates ready! Copy and paste into your API files.');
console.log('Remember to update both route.ts files with the same products.');
