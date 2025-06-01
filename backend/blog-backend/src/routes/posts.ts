import express, { Request, Response } from "express";
import { addPosts } from "../controllers/posts/addPosts";

const router = express.Router();

// GET    /api/posts              # Получение всех постов
router.get("/", addPosts);
// POST   /api/posts              # Создание нового поста
router.post("/", () => {});
// GET    /api/posts/:id          # Получение поста по ID
router.get("/:id", () => {});
// PUT    /api/posts/:id          # Обновление поста
router.put("/:id", () => {});
// DELETE /api/posts/:id          # Удаление поста
router.delete("/:id", () => {});
// GET    /api/posts/:id/comments # Получение комментариев к посту
router.get("/:id/comments", () => {});
// POST   /api/posts/:id/comments # Добавление комментария к посту
router.post("/:id/comments", () => {});

export default router;
