import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { Post } from "../interfaces/posts";

export async function getPostById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const db = req.app.locals.db.dbPost;
    const posts = await db.read();
    const post = posts.find((p: Post) => p.id === id);
    if (!post) {
      next(
        new AppError({
          message: `Пост с id "${id}" не найден.`,
          statusCode: 404,
        })
      );
      return;
    }
    res.status(200).json({ message: "success", data: post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message: message, statusCode: 400 }));
  }
}
