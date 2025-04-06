const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/db.js");
const jobRoutes = require("./routes/jobRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDatabase();

const app = express();

// Middleware

app.use(cors({
  origin: [
    'http://localhost:5173' ,
     'https://job-tracker-swart.vercel.app' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'], 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes
app.use("/api/jobs", jobRoutes);

// Error handler 
app.use(errorHandler);

const PORT = process.env.PORT_VAR || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
