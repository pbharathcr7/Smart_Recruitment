import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ApplicantSidebar.css';
import { useAuth } from './../AuthContext';


export const ApplicantSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className="applicantsidebar">
      <List>
        <ListItem button component={Link} to="/applicantprofile" className={`sidebar-item ${location.pathname === '/applicantprofile' ? 'active' : ''}`}>
          <ListItemIcon >
            <DashboardIcon className='Icon-root'/>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/applyjob" className={`sidebar-item ${location.pathname === '/applyjob' ? 'active' : ''}`}
        >
          <ListItemIcon>
            <WorkIcon className='Icon-root'/>
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItem>
        {/* <ListItem button className="sidebar-item">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Job Status" />
        </ListItem> */}
        <ListItem button onClick={handleLogout} className="sidebar-item">
          <ListItemIcon>
            <LogoutIcon className='Icon-root'/>
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );
};
