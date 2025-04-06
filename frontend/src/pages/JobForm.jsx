import React, { useState } from 'react';
import API from '../api'; 
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const checkForDuplicate = async (company, role) => {
    try {
      const { data } = await API.get(`/check-duplicate?company=${encodeURIComponent(company)}&role=${encodeURIComponent(role)}`);
      return data.isDuplicate;
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const { company, role, appliedDate } = formData;

      if (!company.trim() || !role.trim() || !appliedDate) {
        toast.error('Please fill all required fields');
        return;
      }

      const isDuplicate = await checkForDuplicate(company, role);
      if (isDuplicate) {
        toast.warning('You already applied to this position!');
        return;
      }

      const response = await API.post('/add', formData);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.error || 'Failed to add job');
      }
    } catch (error) {
      console.error('Submission error:', error);

      const message = error.response?.data?.error || error.message || 'Failed to add job. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-form-container">
      <Navbar />
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select 
            name="status"
            value={formData.status} 
            onChange={handleChange}
            disabled={isSubmitting}
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
            value={formData.appliedDate}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label>Job Link:</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="wide-input"
            disabled={isSubmitting}
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
