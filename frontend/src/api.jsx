// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://job-tracker-22ek.onrender.com/api/jobs',
  withCredentials: true
});

export default API;