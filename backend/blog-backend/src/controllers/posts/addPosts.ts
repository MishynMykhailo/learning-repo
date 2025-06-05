import express, { NextFunction, Request, Response } from "express";
import { postsAddSchema } from "../../models/posts";
import { v4 as uuid } from "uuid";
import { AppError } from "../../utils/AppError";

export async function addPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const db = req.app.locals.db;
    const { error, value } = postsAddSchema.validate(req.body);

    if (error) {
      next(new AppError({ message: error.message, statusCode: 400 }));
      return;
    }

    const newPost = {
      id: uuid(),
      ...value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    const posts = await db.read();
    await posts.push(newPost);
    await db.write(posts);
    res.status(201).json({ message: "success", data: newPost });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message, statusCode: 500 }));
  }
}
