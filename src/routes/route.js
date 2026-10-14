
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.post("/register", async (req, res) => {
    try {
        const { name, email, course } = req.body ?? {};

        if (!name || !email || !course) {
            return res.status(400).json({
                message: "Name, email and course are required",
            });
        }

        const result = await pool.query(
            "INSERT INTO students (name, email, course) VALUES ($1, $2, $3) RETURNING *",
            [name, email, course]
        );

        res.status(201).json({
            message: "Student registered successfully",
            student: result.rows[0],
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});

module.exports = router;
