// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import { useNavigate } from 'react-router-dom';
// import Navbar from "../components/Navbar"; 
// import { toast } from 'react-toastify';

// const Home = () => {
//   const [jobs, setJobs] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [editingJob, setEditingJob] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     company: '',
//     role: '',
//     status: 'Applied',
//     appliedDate: '',
//     link: ''
//   });

//   const navigate = useNavigate();
//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch both jobs and status counts in parallel
//       const [jobsResponse, statusResponse] = await Promise.all([
//         API.get('/'),
//         API.get('/status-count')
//       ]);

//       let filteredJobs = jobsResponse.data;
      
//       // Apply status filter if specified
//       if (statusFilter) {
//         filteredJobs = filteredJobs.filter(job => job.status === statusFilter);
//       }

//       // Sort the jobs
//       const sortedJobs = sortJobs(filteredJobs);
      
//       setJobs(sortedJobs);
//       setStatusCounts(statusResponse.data);
//     } catch (error) {
//       toast.error('Failed to fetch jobs');
//       console.error('Error fetching jobs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 



//   const deleteJob = async (id) => {
//     try {
//       await API.delete(`/${id}`);
//       toast.success('Job deleted successfully');
//       fetchJobs();
//     } catch (error) {
//       toast.error('Failed to delete job');
//       console.error('Error deleting job:', error);
//     }
//   };

//   const handleEditClick = (job) => {
//     setEditingJob(job._id);
//     setEditFormData({
//       company: job.company,
//       role: job.role,
//       status: job.status,
//       appliedDate: job.appliedDate.split('T')[0], // Format date for input
//       link: job.link || ''
//     });
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData({
//       ...editFormData,
//       [name]: value
//     });
//   };

//   const handleUpdateJob = async (id) => {
//     try {
//       await API.put(`/${id}`, editFormData);
//       toast.success('Job updated successfully');
//       setEditingJob(null);
//       fetchJobs();
//     } catch (error) {
//       toast.error('Failed to update job');
//       console.error('Error updating job:', error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingJob(null);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [statusFilter]);

//   if (loading) {
//     return <div className="home">Loading...</div>;
//   }

//   return (
//     <div className="home">
//       <Navbar />
//       <h1>Job Application Tracker</h1>


// <div className="status-display">
//         {Object.entries(statusCounts).map(([status, count]) => (
//           <span key={status} className={`status-badge ${status.toLowerCase()}`}>
//             {status}: {count}
//           </span>
//         ))}
//       </div>
      
//       <div className="top-bar">
//         <div className="filter-container">
//           <span className="filter-text">Filter:</span>
//           <select 
//             value={statusFilter} 
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All</option>
//             <option value="Applied">Applied</option>
//             <option value="Interview">Interview</option>
//             <option value="Offer">Offer</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//         </div>

//         <button 
//           className="add-job-btn" 
//           onClick={() => navigate('/add')}
//         >
//           + Add Job
//         </button>
//       </div>

//       <div className="job-grid">
//         {jobs.length > 0 ? (
//           jobs.map((job) => (
//             <div key={job._id} className="job-card">
//               {editingJob === job._id ? (
//                 <div className="edit-form">
//                   <div className="form-group">
//                     <label>Company:</label>
//                     <input
//                       type="text"
//                       name="company"
//                       value={editFormData.company}
//                       onChange={handleEditFormChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Role:</label>
//                     <input
//                       type="text"
//                       name="role"
//                       value={editFormData.role}
//                       onChange={handleEditFormChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Status:</label>
//                     <select
//                       name="status"
//                       value={editFormData.status}
//                       onChange={handleEditFormChange}
//                     >
//                       <option value="Applied">Applied</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Offer">Offer</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label>Applied Date:</label>
//                     <input
//                       type="date"
//                       name="appliedDate"
//                       value={editFormData.appliedDate}
//                       onChange={handleEditFormChange}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label>Job Link:</label>
//                     <input
//                       type="url"
//                       name="link"
//                       value={editFormData.link}
//                       onChange={handleEditFormChange}
//                     />
//                   </div>
//                   <div className="edit-buttons">
//                     <button 
//                       className="save-btn"
//                       onClick={() => handleUpdateJob(job._id)}
//                     >
//                       Save
//                     </button>
//                     <button 
//                       className="cancel-btn"
//                       onClick={handleCancelEdit}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <p><strong>Company:</strong> {job.company}</p>
//                   <p><strong>Role:</strong> {job.role}</p>
//                   <p><strong>Status:</strong> {job.status}</p>
//                   <p><strong>Date:</strong> {new Date(job.appliedDate).toLocaleDateString()}</p>
//                   {job.link && (
//                     <p>
//                       <strong>Link:</strong> 
//                       <a href={job.link} target="_blank" rel="noreferrer"> View</a>
//                     </p>
//                   )}
//                   <div className="action-buttons">
//                     <button 
//                       className="edit-btn"
//                       onClick={() => handleEditClick(job)}
//                     >
//                       Edit
//                     </button>
//                     <button 
//                       className="delete-btn" 
//                       onClick={() => deleteJob(job._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No jobs found. Add your first job application!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; 
import { toast } from 'react-toastify';

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
  const [editingJob, setEditingJob] = useState(null);
  const [editFormData, setEditFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: ''
  });
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
    setEditingJob(job._id);
    setEditFormData({
      company: job.company,
      role: job.role,
      status: job.status,
      appliedDate: job.appliedDate.split('T')[0],
      link: job.link || ''
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleUpdateJob = async (id) => {
    try {
      await API.put(`/${id}`, editFormData);
      toast.success('Job updated successfully');
      setEditingJob(null);
      fetchJobs();
    } catch (error) {
      toast.error('Failed to update job');
      console.error('Error updating job:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  if (loading) {
    return <div className="home">Loading...</div>;
  }

  return (
    <div className="home">
      <Navbar />
       <h1>...Welcome...</h1>

      <div className="status-display">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status} className={`status-badge ${status.toLowerCase()}`}>
            {status}: {count}
          </span>
        ))}
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
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              {editingJob === job._id ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Company:</label>
                    <input
                      type="text"
                      name="company"
                      value={editFormData.company}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role:</label>
                    <input
                      type="text"
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditFormChange}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Applied Date:</label>
                    <input
                      type="date"
                      name="appliedDate"
                      value={editFormData.appliedDate}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Job Link:</label>
                    <input
                      type="url"
                      name="link"
                      value={editFormData.link}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="edit-buttons">
                    <button 
                      className="save-btn"
                      onClick={() => handleUpdateJob(job._id)}
                    >
                      Save
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
              )}
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
