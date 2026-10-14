const express = require("express");
require("dotenv").config();

const app = express();
const studentRoutes = require("./src/routes/route");

app.use(express.json());

app.use("/", studentRoutes);

app.get("/", (req, res) => {
    res.send("PostgreSQL Node.js Server is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
