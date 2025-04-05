// const mongoose = require("mongoose");

// const connectDatabase = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI_VAR, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`DB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDatabase;
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    if (!process.env.MONGO_URI_VAR) {
      throw new Error("MONGO_URI_VAR is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI_VAR, {
      dbName: "Job-Tracker",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to database!");
  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
  }
};

module.exports = connectDatabase;

