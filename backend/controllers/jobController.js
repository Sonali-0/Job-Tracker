const Job = require("../models/JobModel.js");


exports.addJob = async (req, res, next) => {
  try {
    const { company, role } = req.body;
    
    // Check for duplicate first
    const existingJob = await Job.findOne({
      company: { $regex: new RegExp(`^${company}$`, 'i') },
      role: { $regex: new RegExp(`^${role}$`, 'i') }
    });
    
    if (existingJob) {
      return res.status(400).json({
        success: false,
        error: 'You already applied to this position!'
      });
    }

    const job = await Job.create(req.body);
    res.status(201).json({
      success: true,
      data: job,
      message: 'Job added successfully!'
    });
  } catch (err) {
    next(err);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    let jobs = await Job.find();

    if (req.query.status) {
      jobs = jobs.filter(job => job.status === req.query.status);
    }

    if (req.query.sort === "latest") {
      jobs.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    }

    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    next(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};
// Add this new controller function:
exports.checkDuplicate = async (req, res, next) => {
  try {
    const { company, role } = req.query;
    const job = await Job.findOne({ 
      company: { $regex: new RegExp(`^${company}$`, 'i') },
      role: { $regex: new RegExp(`^${role}$`, 'i') }
    });
    res.json({ isDuplicate: !!job });
  } catch (err) {
    next(err);
  }
};

exports.statusCount = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    const counts = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
    res.json(counts);
  } catch (err) {
    next(err);
  }
};
