import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search products, orders..." />
      </div>
      
      <div className="header-actions">
        <button className="header-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        <div className="user-profile">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <span className="user-name">Admin</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .header {
          height: 60px;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          position: fixed;
          top: 0;
          left: var(--sidebar-width);
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          z-index: 90;
        }

        .search-container {
          display: flex;
          align-items: center;
          background-color: var(--bg-primary);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          width: 400px;
          border: 1px solid var(--border);
        }

        .search-icon {
          color: var(--text-secondary);
          margin-right: 0.75rem;
        }

        .search-container input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .header-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #d82c0d;
          border-radius: 50%;
          border: 2px solid white;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background-color: #edeeef;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }
      `}} />
    </header>
  );
};

export default Header;
