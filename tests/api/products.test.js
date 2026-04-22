const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

describe('Products API', () => {
  // Close connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/products - should return all products', async () => {
    const res = await request(app).get('/api/products');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/products/:id - should handle non-existent product', async () => {
    // Generate a valid format but likely non-existent MongoDB ID
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${fakeId}`);
    
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
