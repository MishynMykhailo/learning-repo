import express, { Request, Response, NextFunction } from "express";
import { Post } from "../interfaces/posts";
import { AppError } from "../../utils/AppError";
import { postsAddSchema } from "../../models/posts";
export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  const db = req.app.locals.db.dbPost;
  try {
    const { error, value } = postsAddSchema.validate(req.body);
    if (error) {
      next(new AppError({ message: error.message, statusCode: 400 }));
      return;
    }

    const posts = await db.read();
    const index = posts.findIndex((p: Post) => p.id === id);
    if (index === -1) {
      next(
        new AppError({
          message: `Пост с id: ${id} не найден`,
          statusCode: 404,
        })
      );
      return;
    }
    const updatePost: Post = {
      ...posts[index],
      ...value,
      updatedAt: new Date().toISOString(),
    };
    posts[index] = updatePost;
    await db.write(posts);
    res
      .status(200)
      .json({ message: `Post updated with id:${id}`, data: updatePost });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    new AppError({ message: message, statusCode: 400 });
  }
}
