import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <nav className="nav-bar">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">GH</div>
            <span>Progress</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/changes" className="nav-link">Changes</Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
