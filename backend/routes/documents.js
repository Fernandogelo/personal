const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../db');

const upload = multer({ dest: 'uploads/' });

// Upload student document
router.post('/:studentId', upload.single('document'), async (req, res) => {
    const { studentId } = req.params;
    const fileName = req.file.originalname;
    const filePath = req.file.path;

    try {
        const [result] = await pool.query(
            'INSERT INTO documents (student_id, file_name, file_path) VALUES (?, ?, ?)',
            [studentId, fileName, filePath]
        );
        res.json({ id: result.insertId, studentId, fileName });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
