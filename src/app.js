require("dotenv").config();

const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } =require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});