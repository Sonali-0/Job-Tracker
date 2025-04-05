// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://job-tracker-22ek.onrender.com',
  withCredentials: true
});

export default API;