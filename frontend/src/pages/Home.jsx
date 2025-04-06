
import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0
  });
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  
  const navigate = useNavigate();

  const sortJobs = (jobsToSort) => {
    return [...jobsToSort].sort((a, b) => {
      const statusOrder = { Applied: 1, Interview: 2, Offer: 3, Rejected: 4 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    });
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);

      // Fetch both jobs and status counts in parallel
      const [jobsResponse, statusResponse] = await Promise.all([
        API.get('/'),
        API.get('/status-count')
      ]);

      let filteredJobs = jobsResponse.data;

      // Apply status filter if specified
      if (statusFilter) {
        filteredJobs = filteredJobs.filter(job => job.status === statusFilter);
      }

      // Sort the jobs
      const sortedJobs = sortJobs(filteredJobs);

      setJobs(sortedJobs);
      setStatusCounts(statusResponse.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      await API.delete(`/${id}`);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete job');
      console.error('Error deleting job:', error);
    }
  };

  const handleEditClick = (job) => {
    navigate(`/edit/${job._id}`);
  };


  useEffect(() => {
    setLoading(true); 
    fetchJobs();
  }, [statusFilter]);



  return (
    <div className="home">
      <Navbar />
      <h1>...Welcome...</h1>

      <div className="status-display">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status} className={`status-badge ${status.toLowerCase()}`}>
            {status}: {count}
          </span>
        )
      </div>

      <div className="top-bar">
        <div className="filter-container">
          <span className="filter-text">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

      </div>

      <div className="job-grid">
        { loading ?(  Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="job-card">
        <div className="card-info">
          <p><strong>Company:</strong> <Skeleton width={60} /></p>
          <p><strong>Role:</strong> <Skeleton width={80} /></p>
          <p><strong>Status:</strong> <Skeleton width={60} /></p>
          <p><strong>Date:</strong> <Skeleton width={60} /></p>
          <p><strong>Link:</strong> <Skeleton width={60} /></p>
        </div>
        <div className="action-buttons">
          <Skeleton width={80} height={35} />
          <Skeleton width={80} height={35} />
        </div>
      </div>
    ))):
        jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
   
                <>
                  <div className="card-info">
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Role:</strong> {job.role}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <p><strong>Date:</strong> {new Date(job.appliedDate).toLocaleDateString()}</p>
                    {job.link && (
                      <p>
                        <strong>Link:</strong>
                        <a href={job.link} target="_blank" rel="noreferrer"> View</a>
                      </p>
                    )}
                  </div>

                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>

            </div>
          ))
        ) : (
          <p>No jobs found. Add your first job application!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
