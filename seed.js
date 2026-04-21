const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Wiping database for local image integration...');
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categories = await Category.create([
      { name: 'Rings', description: 'Exquisite Rings' },
      { name: 'Necklaces', description: 'Elegant Necklaces' },
      { name: 'Bracelets', description: 'Timeless Bracelets' },
      { name: 'Wedding Bands', description: 'Eternal Wedding Bands' }
    ]);

    const localRings = [
      'media/Rings/OP001/DSC05777.JPG', 'media/Rings/OP001/DSC05778.JPG', 'media/Rings/OP002/DSC05786.JPG',
      'media/Rings/OP003/DSC05794.JPG', 'media/Rings/OP004/DSC05799.JPG', 'media/Rings/OP005/DSC05805.JPG',
      'media/Rings/OP006/DSC05823.JPG', 'media/Rings/OP006/DSC05824.JPG'
    ];

    const localWeddingBands = [
      'media/Wedding bands/OP085/DSC00361.JPG', 'media/Wedding bands/OP086/DSC00362.JPG',
      'media/Wedding bands/OP087/DSC00364.JPG', 'media/Wedding bands/OP102/DSC00365.JPG',
      'media/Wedding bands/OP103/DSC00368.JPG', 'media/Wedding bands/OP104/DSC00371.JPG',
      'media/Wedding bands/OP105/DSC00374.JPG', 'media/Wedding bands/OP105/DSC00404.JPG'
    ];

    const products = [];

    // Add 16 Rings
    for (let i = 0; i < 16; i++) {
      products.push({
        name: `Signature Ring ${i + 1}`,
        description: 'A beautiful handcrafted ring from our premium collection.',
        price: 500 + (i * 50),
        images: [localRings[i % localRings.length]],
        category: categories[0]._id,
        inventory: 10,
        status: 'active'
      });
    }

    // Add 16 Wedding Bands
    for (let i = 0; i < 16; i++) {
      products.push({
        name: `Eternal Band ${i + 1}`,
        description: 'A timeless wedding band symbolizing eternal love.',
        price: 800 + (i * 75),
        images: [localWeddingBands[i % localWeddingBands.length]],
        category: categories[3]._id,
        inventory: 15,
        status: 'active'
      });
    }

    await Product.create(products);
    console.log('32 Products seeded using LOCAL IMAGES successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
