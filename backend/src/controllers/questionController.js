const db = require("../config/db");

exports.createQuestion = async (req, res) => {
  const { question, options, correct_answer, image, category } = req.body;

  if (!question || !options || !correct_answer)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [result] = await db.execute(
      "INSERT INTO questions (question, options, correct_answer, image, category) VALUES (?, ?, ?, ?, ?)",
      [question, JSON.stringify(options), correct_answer, image, category]
    );

    res.status(201).json({ message: "Question added successfully", questionId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const [questions] = await db.execute("SELECT * FROM questions");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
