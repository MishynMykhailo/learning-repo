import express, { Request, Response } from "express";
import { addPosts } from "../controllers/posts/addPosts";
import { listPosts } from "../controllers/posts/listPosts";
import { getPostById } from "../controllers/posts/getPostById";
import { deletePost } from "../controllers/posts/deletePost";
import { addComment } from "../controllers/comments/addComment";
import { getCommentById } from "../controllers/comments/getCommentById";
import { updatePost } from "../controllers/posts/updatePost";

const router = express.Router();

// GET    /api/posts              # Получение всех постов
router.get("/", listPosts);
// POST   /api/posts              # Создание нового поста
router.post("/", addPosts);
// GET    /api/posts/:id          # Получение поста по ID
router.get("/:id", getPostById);
// PUT    /api/posts/:id          # Обновление поста
router.patch("/:id", updatePost);
// DELETE /api/posts/:id          # Удаление поста
router.delete("/:id", deletePost);
// GET    /api/posts/:id/comments # Получение комментариев к посту
router.get("/:id/comments", getCommentById);
// POST   /api/posts/:id/comments # Добавление комментария к посту
router.post("/:id/comments", addComment);

export default router;
