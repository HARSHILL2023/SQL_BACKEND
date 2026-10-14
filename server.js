const express = require("express");
require("dotenv").config();

const app = express();
const studentRoutes = require("./src/routes/route");

// Read JSON request bodies
app.use(express.json());

// Register student APIs
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("PostgreSQL Node.js Server is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});