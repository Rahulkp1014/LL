import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { getProducts, deleteProduct } from '../api';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="glass-card table-container">
        <div className="table-header-actions">
          <div className="table-search">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Filter products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary flex items-center gap-2">
            <Filter size={18} />
            Availability
          </button>
        </div>

        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Status</th>
              <th>Inventory</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-8">Loading products...</td></tr>
            ) : filteredProducts.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-8">No products found.</td></tr>
            ) : (
              filteredProducts.map((product) => (
                <motion.tr 
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>
                    <div className="product-info-cell">
                      <img src={product.images[0]} alt={product.name} className="product-thumb" />
                      <div className="product-details">
                        <p className="product-name">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${product.status}`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={product.inventory < 10 ? 'text-danger' : ''}>
                      {product.inventory} in stock
                    </span>
                  </td>
                  <td>{product.category?.name || 'Uncategorized'}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className="text-right">
                    <div className="action-btns">
                      <button 
                        className="icon-btn"
                        onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="icon-btn text-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .products-page {
          width: 100%;
        }

        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }

        .table-container {
          padding: 0;
          overflow: hidden;
        }

        .table-header-actions {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }

        .table-search {
          display: flex;
          align-items: center;
          background-color: var(--bg-primary);
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          width: 300px;
        }

        .table-search input {
          background: transparent;
          border: none;
          outline: none;
          margin-left: 0.5rem;
          font-size: 0.9rem;
          width: 100%;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
        }

        .products-table th {
          text-align: left;
          padding: 1rem 1.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          background-color: #f9fafb;
          border-bottom: 1px solid var(--border);
        }

        .products-table td {
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .product-info-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .product-thumb {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          object-fit: cover;
          background-color: #f3f4f6;
        }

        .product-name {
          font-weight: 500;
          color: var(--text-primary);
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
        }

        .status-active { background-color: #e3f1df; color: #008060; }
        .status-draft { background-color: #f3f4f6; color: #6d7175; }
        .status-archived { background-color: #fee2e2; color: #991b1b; }

        .text-danger { color: #d82c0d; }

        .action-btns {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background-color: #f3f4f6;
          color: var(--text-primary);
        }

        .icon-btn.text-danger:hover {
          background-color: #fee2e2;
          color: #d82c0d;
        }
      `}} />
    </div>
  );
};

export default Products;
