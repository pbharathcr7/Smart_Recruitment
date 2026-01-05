import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApplyJob.css'; 
import { ApplicantSidebar } from './ApplicantSidebar';
import { useAuth } from './../AuthContext';

export const ApplyJob = () => {
  const { getValidAccessToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/jobs/');
        if (response.data) {
          setJobs(response.data); 
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const token = await getValidAccessToken();

      if (!token) {
        alert('You must be logged in to apply for jobs.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(`http://localhost:8000/api/jobs/${jobId}/apply/`, {}, config);
      alert('Successfully applied for the job!');
    } catch (error) {
      console.error('Error applying for the job:', error);
      alert('Already applied for the job or update your profile to apply for the job.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <ApplicantSidebar />
        <div className="job-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="dashboard-container">
        <ApplicantSidebar />
        <div className="job-container">
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2>No Jobs Available</h2>
            <p>Check back later for new opportunities</p>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="job-container">
        <div className="job-header">
          <h1>Available Positions</h1>
          <p className="job-count">{jobs.length} {jobs.length === 1 ? 'position' : 'positions'} available</p>
        </div>
        
        <div className="job-grid">
          {jobs.map((job, index) => (
            <div className="job-card" key={index}>
              <div className="job-card-header">
                <div className="job-icon-wrapper">
                  <span className="job-icon">💼</span>
                </div>
                <span className={`employment-badge ${job.employmentType.toLowerCase().replace(' ', '-')}`}>
                  {job.employmentType}
                </span>
              </div>

              <div className="job-card-body">
                <h3 className="job-title">{job.jobTitle}</h3>
                <p className="job-description">{job.jobDescription}</p>
              </div>

              <div className="job-card-footer">
                <div className="job-meta">
                  <div className="meta-item">
                    <span className="meta-icon">💰</span>
                    <span className="meta-text">{job.salaryRange}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    <span className="meta-text">{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span className="meta-text">
                      Closes {new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => handleApply(job.id)} 
                  className="apply-job-btn"
                >
                  Apply for this job
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};