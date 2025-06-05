import express, { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { Post } from "../interfaces/posts";
// router.get("/:id/comments", listComments);
export async function listComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const params = req.params;
  const db = req.app.locals.db;
  try {
    const posts = await db.read();
    const existingPost = posts.find((post: Post) => post.id === params.id);
    if (!existingPost) {
      next(
        new AppError({
          message: `Пост с id: ${params.id} не найден`,
          statusCode: 404,
        })
      );
      return;
    }
    res.status(200).json({
      message: `Comments for post with id: ${params.id} founded`,
      data: existingPost.comments,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message, statusCode: 500 }));
    return;
  }
}
