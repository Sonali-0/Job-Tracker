import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.put(`/${id}`);
        setFormData({
          company: data.company,
          role: data.role,
          status: data.status,
          appliedDate: data.appliedDate.split('T')[0],
          link: data.link || ''
        });
      } catch (error) {
        toast.error('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.put(`/${id}`, formData);
      toast.success('Job updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-form-container">
      <Navbar />
      <h2>Edit Job</h2>
      <form onSubmit={handleUpdate} className="job-form">
        {loading ? (
          <>
            <div className="form-group">
              <label>Company:</label>
              <Skeleton height={35} />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <Skeleton height={35} />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <Skeleton height={35} />
            </div>
            <div className="form-group">
              <label>Applied Date:</label>
              <Skeleton height={35} />
            </div>
            <div className="form-group">
              <label>Job Link:</label>
              <Skeleton height={35} />
            </div>
            <Skeleton width={150} height={40} />
          </>
        ) : (
          <>
            <div className="form-group">
              <label>Company:</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="form-group">
              <label>Applied Date:</label>
              <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Job Link:</label>
              <input type="url" name="link" value={formData.link} onChange={handleChange} />
            </div>
            <button className="submit-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Job'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditJob;
