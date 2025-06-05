import express, { Request, Response, NextFunction } from "express";

export async function addComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const db = req.app.locals.db;
  try {
  } catch (error) {}
}
