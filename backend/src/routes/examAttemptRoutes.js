const express = require("express");
const { startExam, submitExam } = require("../controllers/examAttemptController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/start", authMiddleware, startExam);
router.post("/submit", authMiddleware, submitExam);

module.exports = router;
