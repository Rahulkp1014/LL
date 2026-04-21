import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api';
import { ShoppingBag, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container py-20 text-center">Loading treasure...</div>;
  if (!product) return <div className="container py-20 text-center">Product not found.</div>;

  return (
    <div className="product-detail-page container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ChevronLeft size={20} /> Back to Collection
      </button>

      <div className="product-main">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-gallery"
        >
          <img src={product.images[0]} alt={product.name} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-info"
        >
          <p className="category-label">{product.category?.name}</p>
          <h1>{product.name}</h1>
          
          <div className="rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span>(24 Reviews)</span>
          </div>

          <p className="price">${product.price.toFixed(2)}</p>
          
          <div className="description">
            <p>{product.description}</p>
          </div>

          <div className="actions">
            <button className="add-to-cart-btn">
              <ShoppingBag size={20} /> Add to Bag
            </button>
            <p className="stock-info">{product.inventory} pieces available</p>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .product-detail-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 3rem;
          transition: color 0.3s;
        }

        .back-btn:hover {
          color: var(--text-primary);
        }

        .product-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: start;
        }

        .product-gallery img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          background: #f8f8f8;
        }

        .category-label {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .product-info h1 {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          color: #f59e0b;
        }

        .rating span {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .price {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }

        .description {
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 3rem;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 1.25rem;
          background: black;
          color: white;
          border: none;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: background 0.3s;
          margin-bottom: 1rem;
        }

        .add-to-cart-btn:hover {
          background: #333;
        }

        .stock-info {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: center;
        }
      `}} />
    </div>
  );
};

export default ProductDetail;
