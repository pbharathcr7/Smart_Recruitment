import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Sidebar } from './Sidebar';
import './JobApplicants.css';
import { useAuth } from '../../AuthContext';

export const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(null);
  const { getValidAccessToken } = useAuth();

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = await getValidAccessToken();
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}/applicants/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setApplicants(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [jobId, getValidAccessToken]);

  const analyzeResume = async (applicantId) => {
    const token = await getValidAccessToken();
    if (!token) return;

    setAnalyzing(applicantId);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/jobs/analyze_resume/${applicantId}/${jobId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedApplicants = applicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, score: response.data.score } : applicant
      );
      setApplicants(updatedApplicants);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setAnalyzing(null);
    }
  };

  const renderScoreBar = (value, max = 100) => {
    const percentage = (value / max) * 100;
    return (
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#e2e8f0',
        borderRadius: '3px',
        overflow: 'hidden',
        marginTop: '4px'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          transition: 'width 0.3s ease'
        }}/>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="container">
        <h2 className='app-head'>Applicants for Job</h2>
        <ul className="applicant-list">
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <li key={index} style={{ listStyle: 'none' }}>
                <Skeleton height={200} borderRadius={16} />
              </li>
            ))
          ) : (
            applicants.map((applicant) => (
              <li key={applicant.id} className="applicant-card">
                <span>{applicant.fullName}</span>
                <span>{applicant.phone_number}</span>
                
                {applicant.resume ? (
                  <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                    📄 View Resume
                  </a>
                ) : (
                  <p>No resume available</p>
                )}

                {applicant.score ? (
                  <div className="applicant-details">
                    <p>
                      <strong>Relevance</strong>
                      <span>{applicant.score.relevance}</span>
                    </p>
                    {renderScoreBar(applicant.score.relevance)}
                    
                    <p>
                      <strong>Experience</strong>
                      <span>{applicant.score.experience}</span>
                    </p>
                    {renderScoreBar(applicant.score.experience)}
                    
                    <p>
                      <strong>Skills Match</strong>
                      <span>{applicant.score.skills_match}</span>
                    </p>
                    {renderScoreBar(applicant.score.skills_match)}
                    
                    <p>
                      <strong>Formatting</strong>
                      <span>{applicant.score.formatting}</span>
                    </p>
                    {renderScoreBar(applicant.score.formatting)}
                  </div>
                ) : analyzing === applicant.id ? (
                  <p>✨ Analyzing resume...</p>
                ) : (
                  <button 
                    className="analyze-button"
                    onClick={() => analyzeResume(applicant.id)} 
                    disabled={analyzing !== null}
                  >
                    {analyzing === applicant.id ? 'Analyzing...' : '🔍 Analyze Resume'}
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};