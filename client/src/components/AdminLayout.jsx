import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-wrapper">
        <Header />
        <main className="admin-content">
          {children}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-primary);
        }

        .admin-wrapper {
          flex: 1;
          margin-left: var(--sidebar-width);
          display: flex;
          flex-direction: column;
        }

        .admin-content {
          margin-top: 60px;
          padding: 2rem;
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
      `}} />
    </div>
  );
};

export default AdminLayout;
