import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopLayout from './components/ShopLayout';
import AdminLayout from './components/AdminLayout';

// Shop Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Storefront Routes */}
        <Route path="/" element={<ShopLayout><Home /></ShopLayout>} />
        <Route path="/shop" element={<ShopLayout><Shop /></ShopLayout>} />
        <Route path="/product/:id" element={<ShopLayout><ProductDetail /></ShopLayout>} />
        <Route path="/about" element={<ShopLayout><div>About Page Coming Soon</div></ShopLayout>} />
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><Products /></AdminLayout>} />
        <Route path="/admin/products/new" element={<AdminLayout><ProductForm /></AdminLayout>} />
        <Route path="/admin/products/:id/edit" element={<AdminLayout><ProductForm /></AdminLayout>} />
        <Route path="/admin/categories" element={<AdminLayout><Categories /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
