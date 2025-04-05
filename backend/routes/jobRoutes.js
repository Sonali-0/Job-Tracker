const express = require("express");
const {
  addJob,
  getJobs,
  updateJob,
  deleteJob,
  statusCount
} = require("../controllers/jobController.js");

const router = express.Router();

router.post("/add", addJob);
router.get("/", getJobs);
router.get("/status-count", statusCount);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
