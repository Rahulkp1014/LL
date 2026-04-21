import React, { useState, useEffect } from 'react';
import { Plus, Tag, Edit, Trash2 } from 'lucide-react';
import { getCategories, deleteCategory } from '../api';
import { motion } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(c => c._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Categories</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="glass-card table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Slug</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8">Loading categories...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8">No categories found.</td></tr>
            ) : (
              categories.map((cat) => (
                <motion.tr 
                  key={cat._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="cat-icon-wrapper">
                        <Tag size={16} />
                      </div>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  </td>
                  <td className="text-secondary">{cat.description}</td>
                  <td className="text-secondary">/{cat.slug}</td>
                  <td className="text-right">
                    <div className="action-btns">
                      <button className="icon-btn"><Edit size={16} /></button>
                      <button 
                        className="icon-btn text-danger"
                        onClick={() => handleDelete(cat._id)}
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
        .categories-page { width: 100%; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .font-medium { font-weight: 500; }
        .text-secondary { color: var(--text-secondary); }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .py-8 { padding-top: 2rem; padding-bottom: 2rem; }

        .cat-icon-wrapper {
          width: 32px;
          height: 32px;
          background-color: #f3f4f6;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }

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

export default Categories;
