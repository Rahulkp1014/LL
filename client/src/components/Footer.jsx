import React from 'react';

const Footer = () => {
  return (
    <footer className="shop-footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>LUSTER LANE</h3>
          <p>Exquisite jewelry crafted for moments that matter. Timeless elegance, modern design.</p>
        </div>
        <div className="footer-section">
          <h4>Collection</h4>
          <ul>
            <li>Rings</li>
            <li>Necklaces</li>
            <li>Bracelets</li>
            <li>Earrings</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>Gift Cards</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="footer-form">
            <input type="email" placeholder="Enter your email" />
            <button>JOIN</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Luster Lane. All Rights Reserved.</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .shop-footer {
          background-color: #fafafa;
          padding: 5rem 0 2rem;
          border-top: 1px solid var(--border);
          margin-top: 5rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 4rem;
          padding: 0 2rem;
        }

        .footer-section h3 {
          font-family: 'Outfit', sans-serif;
          margin-bottom: 1.5rem;
          letter-spacing: 2px;
        }

        .footer-section h4 {
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-section p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .footer-section ul li:hover {
          color: var(--text-primary);
        }

        .footer-form {
          margin-top: 1.5rem;
          display: flex;
          gap: 0.5rem;
        }

        .footer-form input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid var(--border);
          outline: none;
          background: white;
        }

        .footer-form button {
          padding: 0.75rem 1.5rem;
          background: var(--text-primary);
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .footer-bottom {
          margin-top: 5rem;
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.05);
          color: var(--text-secondary);
          font-size: 0.8rem;
        }
      `}} />
    </footer>
  );
};

export default Footer;
