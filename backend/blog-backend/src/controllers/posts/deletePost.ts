import express, { Request, Response, NextFunction } from "express";
import { Post } from "../interfaces/posts";
import { AppError } from "../../utils/AppError";

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const db = req.app.locals.db.dbPost;
    const posts = await db.read();

    const existingPost = posts.find((post: Post) => post.id === id);
    if (!existingPost) {
      next(
        new AppError({
          message: `Пост с id: ${id} не найден`,
          statusCode: 404,
        })
      );
      return;
    }

    const updatedPosts = posts.filter((post: Post) => post.id !== id);
    await db.write(updatedPosts);

    res.status(200).json({
      message: `Пост с id: ${id} успешно удалён.`,
      data: existingPost,
    });
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message, statusCode: 500 }));
    return;
  }
}
