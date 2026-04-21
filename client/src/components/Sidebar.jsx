import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Tag, 
  Users, 
  BarChart2, 
  Settings, 
  ShoppingBag 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingBag size={20} />, path: '/admin/orders' },
    { name: 'Products', icon: <Package size={20} />, path: '/admin/products' },
    { name: 'Categories', icon: <Tag size={20} />, path: '/admin/categories' },
    { name: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">L</div>
        <span>Luster Admin</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background-color: var(--bg-secondary);
          border-right: 1px solid var(--border);
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          z-index: 100;
        }

        .sidebar-brand {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          background-color: var(--accent);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 1rem;
        }

        .sidebar-nav {
          padding: 0.5rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s ease;
          margin-bottom: 2px;
        }

        .nav-item:hover {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        .nav-item.active {
          background-color: #edeeef;
          color: var(--text-primary);
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}} />
    </aside>
  );
};

export default Sidebar;
