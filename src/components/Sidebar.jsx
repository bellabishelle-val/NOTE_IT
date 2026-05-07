import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('sidebar-collapsed');
    }
  };

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/notebook', icon: '📔', label: 'Notebook' }
  ];

  const premiumItem = {
    path: '/premium',
    icon: '💎',
    label: 'Premium'
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-welcome">
          <div className="welcome-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase() || 'V'}
            </div>
          </div>
          <div className="welcome-text">
            <h3 className="welcome-title">Welcome, {user?.name || 'Varli'}!</h3>
            
          </div>
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="menu-section">
          <h4 className="menu-section-title">📋 Activities</h4>
          <div className="menu-items">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="menu-section">
          <h4 className="menu-section-title">⭐ Premium</h4>
          <div className="menu-items">
            <Link
              to={premiumItem.path}
              className={`menu-item premium-menu-item ${location.pathname === premiumItem.path ? 'active' : ''}`}
            >
              <span className="menu-icon premium-icon">{premiumItem.icon}</span>
              <span className="menu-label">{premiumItem.label}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="footer-info">
          <p className="footer-text">© 2024 Note It</p>
          <p className="footer-subtitle">Premium Stationery Store</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
