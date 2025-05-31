import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/posts"); // получить список постов
router.get("/posts/:id"); // получить конкретный пост
router.post("/posts"); // создать новый пост
router.patch("/posts/:id"); // обновить пост частично
router.delete("/posts/:id"); // удалить пост
