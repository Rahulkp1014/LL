import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getProducts();
        setFeaturedProducts(res.data.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elegance in <br /> Every Sparkle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our curated collection of fine jewelry, handcrafted for timeless beauty.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/shop" className="hero-btn">Explore Collection <ArrowRight size={18} /></Link>
          </motion.div>
        </div>
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Jewelry" 
          className="hero-img"
        />
      </section>

      {/* Featured Products */}
      <section className="container featured-section">
        <div className="section-header">
          <h2>Featured Collection</h2>
          <Link to="/shop" className="view-all">View All Products</Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product._id} 
              className="product-card"
              whileHover={{ y: -10 }}
            >
              <Link to={`/product/${product._id}`} className="product-link">
                <div className="img-wrapper">
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero {
          height: 90vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          color: white;
        }

        .hero-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -2;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          z-index: -1;
        }

        .hero-content h1 {
          font-size: 5rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }

        .hero-content p {
          font-size: 1.25rem;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0.9;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          background: white;
          color: black;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s;
        }

        .hero-btn:hover {
          background: black;
          color: white;
        }

        .featured-section {
          padding: 8rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 300;
        }

        .view-all {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 600;
          border-bottom: 1px solid var(--border);
          padding-bottom: 2px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.5rem;
        }

        .product-card {
          background: white;
          transition: all 0.3s;
        }

        .product-link {
          text-decoration: none;
          color: inherit;
        }

        .img-wrapper {
          aspect-ratio: 1/1;
          overflow: hidden;
          margin-bottom: 1.5rem;
          background: #f8f8f8;
        }

        .img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s;
        }

        .product-card:hover .img-wrapper img {
          transform: scale(1.1);
        }

        .product-info h3 {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .price {
          color: var(--text-secondary);
          font-weight: 600;
        }
      `}} />
    </div>
  );
};

export default Home;
