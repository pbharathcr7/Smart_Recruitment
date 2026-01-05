import React from 'react';
import { Sidebar } from './Sidebar';
import { JobInfo } from './JobInfo';
import './Dashboard.css';

export default function Dashboard(){
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <JobInfo />
      </div>
    </div>
  );
};
