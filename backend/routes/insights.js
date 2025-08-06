const express = require('express');
const router = express.Router();
const pool = require('../db');
const { analyzeStudentData } = require('../services/geminiService');

// Generate insights using Gemini
router.post('/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const { content } = req.body; // text from docs, exam results, etc.

    const aiResult = await analyzeStudentData(content);
    if (!aiResult) return res.status(500).json({ error: 'AI analysis failed' });

    // You can parse aiResult into structured strengths/weaknesses
    // Here we save as a raw recommendation
    try {
        const [result] = await pool.query(
            'INSERT INTO insights (student_id, strengths, weaknesses, recommendations) VALUES (?, ?, ?, ?)',
            [studentId, aiResult, aiResult, aiResult]
        );
        res.json({ id: result.insertId, aiResult });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get insights per student
router.get('/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const [rows] = await pool.query(
        'SELECT * FROM insights WHERE student_id=? ORDER BY created_at DESC',
        [studentId]
    );
    res.json(rows);
});

module.exports = router;
