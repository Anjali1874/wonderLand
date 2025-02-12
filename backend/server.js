require("dotenv").config();
const express = require("express");
const cors = require("cors");
const examAttemptRoutes = require("./src/routes/examAttemptRoutes");
const authRoutes = require("./src/routes/authRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const examRoutes = require("./src/routes/examRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exam-attempts", examAttemptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
