const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pool = require('../db'); // MySQL pool
const { analyzeStudentData } = require('../services/geminiService');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// ===============================================
// GET /api/students -> Fetch all students
// ===============================================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error('DB Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch students' });
    }
});

// ===============================================
// POST /api/students -> Add new student to database
// ===============================================
router.post('/', async (req, res) => {
    const { name, grade } = req.body;

    if (!name || !grade) {
        return res.status(400).json({ message: 'Name and grade are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO students (name, grade) VALUES (?, ?)',
            [name, grade]
        );

        res.status(201).json({
            message: 'Student added successfully',
            studentId: result.insertId
        });
    } catch (error) {
        console.error('DB Error:', error.message);
        res.status(500).json({ message: 'Failed to add student' });
    }
});

// ===============================================
// POST /api/students/analyze -> Analyze with Gemini AI
// ===============================================
router.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        const textContent = req.body.text || "Analyze this student's document.";
        let imageBase64 = null;

        if (req.file) {
            const fileData = fs.readFileSync(req.file.path);
            imageBase64 = fileData.toString('base64');
            fs.unlinkSync(req.file.path); // delete temporary file
        }

        const result = await analyzeStudentData(textContent, imageBase64);
        res.json({ insights: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI analysis failed' });
    }
});

module.exports = router;
