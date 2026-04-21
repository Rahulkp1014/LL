const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('CLEANING DATABASE...');
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categories = await Category.create([
      { name: 'Rings', description: 'Rings' },
      { name: 'Necklaces', description: 'Necklaces' },
      { name: 'Bracelets', description: 'Bracelets' },
      { name: 'Earrings', description: 'Earrings' }
    ]);

    // These are 10 HIGHLY RELIABLE Unsplash Jewelry IDs
    const reliableIds = [
      '1605100804763-247f67b3f8a6', // Ring
      '1515562141207-7a88fb7ce338', // Jewelry box
      '1599643478518-a784e5dc4c8f', // Pearl
      '1611591437281-460bfbe1220a', // Diamond Ring
      '1535632066927-ab7c9ab60908', // Earrings
      '1544441893-675973e31985', // Band
      '1584302179602-e4c3d3fd629d', // Bracelet
      '1573408301185-9146fe634ad0', // Rings
      '1588891823945-316489370773', // Pendant
      '1586104240436-450efdec0560'  // Diamond
    ];

    const products = [];
    for (let i = 1; i <= 32; i++) {
      const id = reliableIds[i % reliableIds.length];
      products.push({
        name: `Luster Luxury Item #${i}`,
        description: 'Exquisite jewelry piece handcrafted with premium materials and timeless design.',
        price: 199 + (i * 25),
        images: [`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`],
        category: categories[i % 4]._id,
        inventory: 10,
        status: 'active'
      });
    }

    await Product.create(products);
    console.log('DATABASE WIPED AND 32 NEW PRODUCTS CREATED!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
