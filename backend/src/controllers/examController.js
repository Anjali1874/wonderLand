const db = require("../config/db");

// Create an exam
exports.createExam = async (req, res) => {
  const { name, start_time, end_time, duration, question_ids } = req.body;

  if (!name || !start_time || !end_time || !duration || !Array.isArray(question_ids) || question_ids.length === 0) {
    return res.status(400).json({ message: "All fields are required and question_ids must be an array" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO exams (name, start_time, end_time, duration, question_ids) VALUES (?, ?, ?, ?, CAST(? AS JSON))",
      [name, start_time, end_time, duration, JSON.stringify(question_ids)]
    );
    

    res.status(201).json({ message: "Exam created successfully", examId: result.insertId });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all exams
exports.getExams = async (req, res) => {
  try {
    const [rows] = await db.execute(`
        SELECT 
            e.id, 
            e.name, 
            COUNT(ea.id) AS attempts 
        FROM exams e
        LEFT JOIN exam_attempts ea ON e.id = ea.exam_id
        GROUP BY e.id, e.name
    `);
    res.json(rows);
} catch (error) {
    console.error("Error fetching exam stats", error);
    res.status(500).json({ error: "Internal Server Error" });
}
};

// Get questions for a specific exam
exports.getExamQuestions = async (req, res) => {
  const { examId } = req.params;

  try {
    const [questions] = await db.execute(
      `SELECT q.id, q.question, q.options, q.correct_answer, q.image, q.category 
       FROM questions q
       JOIN exams e ON JSON_CONTAINS(e.question_ids, CAST(q.id AS JSON))
       WHERE e.id = ?`, 
      [examId]
    );

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
