const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();

    // Create Categories
    const categories = await Category.create([
      { name: 'Rings', description: 'Exquisite diamond and gold rings.' },
      { name: 'Necklaces', description: 'Elegant necklaces for every occasion.' },
      { name: 'Bracelets', description: 'Timeless bracelets crafted with precision.' },
      { name: 'Earrings', description: 'Sparkling earrings that catch the light.' }
    ]);

    console.log('Categories seeded!');

    // Create Products
    const products = [
      {
        name: 'Solitaire Diamond Ring',
        description: 'A classic 1-carat diamond set in 18k white gold.',
        price: 1200,
        images: ['https://images.unsplash.com/photo-1605100804763-247f67b3f8a6?auto=format&fit=crop&q=80&w=800'],
        category: categories[0]._id,
        inventory: 15,
        status: 'active'
      },
      {
        name: 'Eternal Gold Band',
        description: 'Simple and elegant 24k gold band.',
        price: 450,
        images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'],
        category: categories[0]._id,
        inventory: 50,
        status: 'active'
      },
      {
        name: 'Sapphire Pendant',
        description: 'Deep blue sapphire pendant on a silver chain.',
        price: 850,
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800'],
        category: categories[1]._id,
        inventory: 8,
        status: 'active'
      },
      {
        name: 'Pearl Necklace',
        description: 'Hand-picked freshwater pearls.',
        price: 300,
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
        category: categories[1]._id,
        inventory: 20,
        status: 'active'
      },
      {
        name: 'Diamond Tennis Bracelet',
        description: 'Stunning line of diamonds set in platinum.',
        price: 2500,
        images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
        category: categories[2]._id,
        inventory: 5,
        status: 'active'
      },
      {
        name: 'Emerald Studs',
        description: 'Vibrant emerald studs with diamond halo.',
        price: 950,
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
        category: categories[3]._id,
        inventory: 12,
        status: 'active'
      }
    ];

    await Product.create(products);
    console.log('Products seeded!');

    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
