const db = require("../config/db");

exports.startExam = async (req, res) => {
  const { examId } = req.params;
  const studentId = req.user.userId; // Extract from token middleware

  try {
    // Check if the student has already attempted this exam
    const [existingAttempts] = await db.execute(
      "SELECT id FROM exam_attempts WHERE exam_id = ? AND student_id = ? AND status = 'ongoing'",
      [examId, studentId]
    );

    if (existingAttempts.length > 0) {
      return res.status(400).json({ message: "You have already started this exam." });
    }

    // Create a new exam attempt
    const [attempt] = await db.execute(
      "INSERT INTO exam_attempts (exam_id, student_id) VALUES (?, ?)",
      [examId, studentId]
    );

    // Fetch the exam details
    const [examData] = await db.execute("SELECT question_ids FROM exams WHERE id = ?", [examId]);
    if (examData.length === 0) return res.status(404).json({ message: "Exam not found" });

    const questionIds = JSON.parse(examData[0].question_ids);

    // Fetch the questions from the `questions` table
    const placeholders = questionIds.map(() => "?").join(", ");
    const [questions] = await db.execute(`SELECT id, question, options FROM questions WHERE id IN (${placeholders})`, questionIds);

    res.json({
      attemptId: attempt.insertId,
      examId,
      questions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
// Submit exam and calculate score
const db = require("../config/db");

exports.submitExam = async (req, res) => {
  const { examId } = req.params;
  const studentId = req.user.userId;
  const { score, totalQuest } = req.body; // Extract score and total questions

  try {
    // Insert the result into the `results` table
    await db.execute(
      "INSERT INTO results (exam_id, student_id, score, total_questions) VALUES (?, ?, ?, ?)",
      [examId, studentId, score, totalQuest]
    );

    res.json({ message: "Exam submitted successfully", score, totalQuestions: totalQuest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
