const db = require("../config/db");

exports.submitExam = async (req, res) => {
  const { student_id, exam_id, answers } = req.body;

  if (!student_id || !exam_id || !answers)
    return res.status(400).json({ message: "All fields are required" });

  try {
    // Get the exam questions
    const [exam] = await db.execute("SELECT * FROM exams WHERE id = ?", [exam_id]);
    if (exam.length === 0) return res.status(404).json({ message: "Exam not found" });

    const questionIds = JSON.parse(exam[0].question_ids);
    let score = 0;
    let totalQuestions = questionIds.length;

    // Check answers
    for (let i = 0; i < questionIds.length; i++) {
      const [question] = await db.execute("SELECT correct_answer FROM questions WHERE id = ?", [
        questionIds[i],
      ]);
      if (question.length > 0 && question[0].correct_answer === answers[questionIds[i]]) {
        score++;
      }
    }

    // Save the result
    await db.execute(
      "INSERT INTO results (student_id, exam_id, score, total_questions) VALUES (?, ?, ?, ?)",
      [student_id, exam_id, score, totalQuestions]
    );

    res.status(201).json({ message: "Exam submitted successfully", score, totalQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResults = async (req, res) => {
  try {
    const [results] = await db.execute(
      "SELECT r.id, u.name AS student_name, e.name AS exam_name, r.score, r.total_questions FROM results r JOIN users u ON r.student_id = u.id JOIN exams e ON r.exam_id = e.id"
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
