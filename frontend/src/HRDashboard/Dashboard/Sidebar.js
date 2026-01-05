import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { useAuth } from './../../AuthContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { text: 'Job Creation', icon: WorkIcon, path: '/jobcreation' },
  ];

  return (
    <div className="sidebar">
      {/* Header with Logo */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">HR</div>
          <span className="logo-text">JobPortal</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <List className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <ListItem
              key={item.path}
              button
              component={Link}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <ListItemIcon>
                <IconComponent className="Icon-root" />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>

      {/* Footer with Logout */}
      <div className="sidebar-footer">
        <ListItem 
          button 
          onClick={handleLogout} 
          className="sidebar-item logout-item"
        >
          <ListItemIcon>
            <LogoutIcon className="Icon-root" />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </div>
    </div>
  );
};