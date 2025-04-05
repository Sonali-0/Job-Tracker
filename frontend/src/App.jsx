// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import JobForm from "./pages/JobForm"; // Updated import path
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<JobForm />} />
      </Routes>
    </Router>
  );
};

export default App;