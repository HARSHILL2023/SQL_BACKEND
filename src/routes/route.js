const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// API 1: Fetch all students
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM students ORDER BY id"
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Failed to fetch students",
        });
    }
});

// API 2: Insert a new student
router.post("/", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({
                message: "Name, email and course are required",
            });
        }

        const result = await pool.query(
            `INSERT INTO students (name, email, course)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, course]
        );

        res.status(201).json({
            message: "Student added successfully",
            student: result.rows[0],
        });
    } catch (error) {
        console.error(error.message);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        res.status(500).json({
            message: "Failed to add student",
        });
    }
});

module.exports = router;