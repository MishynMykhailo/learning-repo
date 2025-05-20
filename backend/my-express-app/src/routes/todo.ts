import express, { Request, Response } from "express";
import { tasks, Task } from "../db/store";

const router = express.Router();

router.get("/tasks", (req: Request, res: Response) => {
  res.status(200).json(tasks);
});
router.get("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    res.status(404).json({ error: "Задача не найдена" });
    return;
  }
  res.status(200).json(task);
});
router.post("/tasks", (req: Request, res: Response) => {
  const { id, title, completed } = req.body;
  if (
    typeof id !== "number" ||
    typeof title !== "string" ||
    typeof completed !== "boolean"
  ) {
    res.status(400).json({ error: "Неверный формат данных" });
    return;
  }
  const exists = tasks.find((t) => t.id === id);
  if (exists) {
    res.status(409).json({ error: "ID уже существует" });
    return;
  }

  const newTask: Task = { id, title, completed };
  tasks.push(newTask);

  res.status(201).json({ message: "Задача создана", task: newTask });
});

router.put("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    res.status(404).json({ error: "Задача не найдена" });
    return;
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json({ message: "Задача обновлена", task });
});
router.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Задача не найдена" });
    return;
  }
  const removed = tasks.splice(index, 1);
  res.status(200).json({ message: "Задача удалена", task: removed[0] });
});

export default router;
