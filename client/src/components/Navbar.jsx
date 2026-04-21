import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">LUSTER LANE</Link>
        
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/shop" className={({isActive}) => isActive ? 'active' : ''}>Shop</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
        </div>

        <div className="nav-actions">
          <button className="icon-btn"><Search size={20} /></button>
          <Link to="/login" className="icon-btn"><User size={20} /></Link>
          <Link to="/cart" className="icon-btn cart-icon">
            <ShoppingCart size={20} />
            <span className="cart-badge">0</span>
          </Link>
          <Link to="/admin" className="admin-link">Admin</Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .navbar {
          height: 80px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .logo {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-decoration: none;
          color: var(--text-primary);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-links a:hover, .nav-links a.active {
          color: var(--text-primary);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background: var(--text-primary);
          color: white;
          font-size: 0.7rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-link {
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: underline;
          color: var(--text-secondary);
        }
      `}} />
    </nav>
  );
};

export default Navbar;
