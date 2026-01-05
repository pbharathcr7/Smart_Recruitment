import React from 'react';
import { Outlet } from 'react-router-dom';
import { ApplicantSidebar } from './ApplicantSidebar';
import './ApplicantDashboard.css';

const ApplicantDashboard = ({ children }) => {
  return (
    <div className="dashboard-container">
      <ApplicantSidebar />
      <div className="dashboard-content">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default ApplicantDashboard;
