"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_1 = require("../db/store");
const router = express_1.default.Router();
router.get("/tasks", (req, res) => {
    res.status(200).json(store_1.tasks);
});
router.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = store_1.tasks.find((t) => t.id === id);
    if (!task) {
        res.status(404).json({ error: "Задача не найдена" });
        return;
    }
    res.status(200).json(task);
});
router.post("/tasks", (req, res) => {
    const { id, title, completed } = req.body;
    if (typeof id !== "number" ||
        typeof title !== "string" ||
        typeof completed !== "boolean") {
        res.status(400).json({ error: "Неверный формат данных" });
        return;
    }
    const exists = store_1.tasks.find((t) => t.id === id);
    if (exists) {
        res.status(409).json({ error: "ID уже существует" });
        return;
    }
    const newTask = { id, title, completed };
    store_1.tasks.push(newTask);
    res.status(201).json({ message: "Задача создана", task: newTask });
});
router.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;
    const task = store_1.tasks.find((t) => t.id === id);
    if (!task) {
        res.status(404).json({ error: "Задача не найдена" });
        return;
    }
    if (title !== undefined)
        task.title = title;
    if (completed !== undefined)
        task.completed = completed;
    res.status(200).json({ message: "Задача обновлена", task });
});
router.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = store_1.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
        res.status(404).json({ error: "Задача не найдена" });
        return;
    }
    const removed = store_1.tasks.splice(index, 1);
    res.status(200).json({ message: "Задача удалена", task: removed[0] });
});
exports.default = router;
