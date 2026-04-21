const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create category slug from the name
CategorySchema.pre('save', function() {
  if (this.name) {
    this.slug = this.name.toLowerCase().split(' ').join('-');
  }
});

module.exports = mongoose.model('Category', CategorySchema);
