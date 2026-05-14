require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling over-ear headphones with 30-hour battery life.',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'electronics',
    stock: 50,
    rating: 4.5,
  },
  {
    name: 'Men Casual Slim Fit Shirt',
    description: 'Comfortable cotton casual shirt available in multiple colors.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    category: 'clothing',
    stock: 120,
    rating: 4.2,
  },
  {
    name: 'Smartphone 128GB',
    description: '6.5 inch AMOLED display, 48MP camera, 5000mAh battery.',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    category: 'electronics',
    stock: 30,
    rating: 4.7,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight breathable sports shoes for daily running.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'footwear',
    stock: 80,
    rating: 4.3,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall insulated 750ml bottle keeps drinks cold for 24h.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    category: 'home',
    stock: 200,
    rating: 4.6,
  },
  {
    name: 'Backpack 30L',
    description: 'Water-resistant laptop backpack with USB charging port.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'accessories',
    stock: 60,
    rating: 4.4,
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit keyboard with blue switches, perfect for coding & gaming.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    category: 'electronics',
    stock: 40,
    rating: 4.8,
  },
  {
    name: 'Yoga Mat 6mm',
    description: 'Non-slip eco-friendly TPE yoga mat with carry strap.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'fitness',
    stock: 150,
    rating: 4.1,
  },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  const created = await Product.insertMany(sampleProducts);
  console.log(`Seeded ${created.length} products`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
