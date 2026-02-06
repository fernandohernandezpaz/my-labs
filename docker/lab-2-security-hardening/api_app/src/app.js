import express from "express";
import apiRoutes from "./routes/api.router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Docker Security Lab API" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
