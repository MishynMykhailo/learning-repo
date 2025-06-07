import express, { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { v4 as uuid } from "uuid";
import { commentAddSchema } from "../../models/comments";
export async function addComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId = req.params.id;
  const db = req.app.locals.db.dbComment;
  try {
    const { error, value } = commentAddSchema.validate(req.body);

    if (error) {
      next(new AppError({ message: error.message, statusCode: 400 }));
      return;
    }
    const newComment = {
      id: uuid(),
      postId: postId,
      ...value,
      createdAt: new Date().toISOString(),
    };

    const comments = await db.read();
    comments.push(newComment);
    await db.write(comments);
    res.status(201).json({ message: "success", data: newComment });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message, statusCode: 500 }));
    return;
  }
}
