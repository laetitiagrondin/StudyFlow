import * as taskService from "../services/taskService.js";

export const createTask = async (req, res) => {
    const task = await taskService.createTask(req.body);
    res.json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
};

export const updateTask = async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json(task);
};

export const deleteTask = async (req, res) => {
    await taskService.deleteTask(req.params.id);
    res.json({ message: "Tâche supprimée" });
};
