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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/add', formData);
      toast.success('Job added successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error adding job');
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
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select 
            name="status"
            value={formData.status} 
            onChange={handleChange}
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
          />
        </div>
        <button type="submit" className="submit-btn">Add Job</button>
      </form>
    </div>
  );
};

export default JobForm;