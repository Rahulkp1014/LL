import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const ShopLayout = ({ children }) => {
  return (
    <div className="shop-layout">
      <Navbar />
      <main className="shop-main">
        {children}
      </main>
      <Footer />
      
      <style dangerouslySetInnerHTML={{ __html: `
        .shop-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .shop-main {
          flex: 1;
        }
      `}} />
    </div>
  );
};

export default ShopLayout;
