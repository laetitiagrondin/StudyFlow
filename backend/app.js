const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let tasks = [
    { id: 1, title: "Réviser maths" },
    { id: 2, title: "Réviser français" }
];

app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        priority: req.body.priority,
        status: req.body.status,
        duration: req.body.duration,
        date: req.body.date
    };
    tasks.push(newTask);
    res.json(newTask);
});

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.put("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ message: "Tâche introuvable" });
    }
    task.title = req.body.title;
    res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.filter(t => t.id !== id);
    res.json({ message: "Tâche supprimée" });
});

app.post("/api/planning/generate", (req, res) => {
    res.send("Planning généré");
});

app.put("/api/schedule", (req, res) => {
    res.send("Calendrier mis à jour");
});

app.get("/api/schedule", (req, res) => {
    res.send("Obtenir emploi du temps");
});

module.exports = app;
