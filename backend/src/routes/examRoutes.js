const express = require("express");
const { createExam, getExams, getExamQuestions } = require("../controllers/examController");
const router = express.Router();

router.post("/create", createExam);
router.get("/", getExams);
router.get("/:examId/questions", getExamQuestions); // ✅ Corrected route

module.exports = router;
