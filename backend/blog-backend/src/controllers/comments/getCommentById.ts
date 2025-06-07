import express, { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { Comment } from "../interfaces/comment";
// router.get("/:id/comments", listComments);
export async function getCommentById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const params = req.params;
  const dbComment = req.app.locals.db.dbComment;
  try {
    const comments = await dbComment.read();
    const existingPost = comments.filter(
      (comment: Comment) => comment.postId === params.id
    );
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
      data: existingPost,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message, statusCode: 500 }));
    return;
  }
}
