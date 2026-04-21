import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { getCategories, createProduct, getProduct, updateProduct } from '../api';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inventory: 0,
    status: 'active',
    images: ['']
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
      if (!isEdit && res.data.data.length > 0) {
        setFormData(prev => ({ ...prev, category: res.data.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await getProduct(id);
      const p = res.data.data;
      setFormData({
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category._id,
        inventory: p.inventory,
        status: p.status,
        images: p.images
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="product-form-page">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/products')} className="icon-btn">
            <ArrowLeft size={20} />
          </button>
          <h1>{isEdit ? 'Edit Product' : 'Add Product'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-main">
          <div className="glass-card form-section">
            <h3>Basic Information</h3>
            <div className="input-group">
              <label>Product Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Diamond Ring"
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <textarea 
                rows="5" 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your product..."
              ></textarea>
            </div>
          </div>

          <div className="glass-card form-section">
            <h3>Media</h3>
            <div className="media-inputs">
              {formData.images.map((img, idx) => (
                <div key={idx} className="input-group">
                  <label>Image URL {idx + 1}</label>
                  <input 
                    type="text" 
                    value={img}
                    onChange={e => handleImageChange(idx, e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card form-section">
            <h3>Pricing & Inventory</h3>
            <div className="form-row">
              <div className="input-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="input-group">
                <label>Inventory Quantity</label>
                <input 
                  type="number" 
                  required
                  value={formData.inventory}
                  onChange={e => setFormData({...formData, inventory: e.target.value})}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-sidebar">
          <div className="glass-card form-section">
            <h3>Organization</h3>
            <div className="input-group">
              <label>Product Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="input-group">
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                required
              >
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions-bottom">
            <button type="button" onClick={() => navigate('/admin/products')} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Product</button>
          </div>
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .form-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .form-section {
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-section h3 {
          font-size: 1rem;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .input-group {
          margin-bottom: 1.25rem;
        }

        .input-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }

        .input-group input, .input-group textarea, .input-group select {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-group input:focus, .input-group textarea:focus, .input-group select:focus {
          border-color: var(--accent);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-actions-bottom {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .form-actions-bottom .btn {
          flex: 1;
        }
      `}} />
    </div>
  );
};

export default ProductForm;
