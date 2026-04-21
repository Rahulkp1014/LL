import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category?._id === selectedCategory);

  return (
    <div className="shop-page container">
      <header className="shop-header">
        <h1>Our Collection</h1>
        <p>Discover timeless pieces designed to be cherished forever.</p>
      </header>

      <div className="shop-content">
        <aside className="filters">
          <h3>Categories</h3>
          <ul>
            <li 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All Jewelry
            </li>
            {categories.map(cat => (
              <li 
                key={cat._id}
                className={selectedCategory === cat._id ? 'active' : ''}
                onClick={() => setSelectedCategory(cat._id)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        <main className="products-main">
          {loading ? (
            <div className="loading">Loading our treasures...</div>
          ) : (
            <div className="shop-grid">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product._id} 
                  className="shop-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="img-container">
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="info">
                      <h4>{product.name}</h4>
                      <p className="cat">{product.category?.name}</p>
                      <p className="price">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .shop-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .shop-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .shop-header h1 {
          font-size: 3.5rem;
          font-weight: 300;
          margin-bottom: 1rem;
        }

        .shop-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .shop-content {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 4rem;
        }

        .filters h3 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .filters ul {
          list-style: none;
        }

        .filters ul li {
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s;
        }

        .filters ul li:hover, .filters ul li.active {
          color: var(--text-primary);
          font-weight: 600;
        }

        .shop-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 3rem 2rem;
        }

        .shop-card a {
          text-decoration: none;
          color: inherit;
        }

        .img-container {
          aspect-ratio: 1/1;
          background: #f8f8f8;
          overflow: hidden;
          margin-bottom: 1.25rem;
        }

        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .shop-card:hover .img-container img {
          transform: scale(1.05);
        }

        .shop-card h4 {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .cat {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .shop-card .price {
          font-weight: 600;
        }

        .loading {
          text-align: center;
          padding: 5rem;
          color: var(--text-secondary);
        }
      `}} />
    </div>
  );
};

export default Shop;
