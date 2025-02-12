const express = require("express");
const { submitExam, getResults } = require("../controllers/resultController");
const router = express.Router();

router.post("/submit", submitExam);
router.get("/", getResults);

module.exports = router;
