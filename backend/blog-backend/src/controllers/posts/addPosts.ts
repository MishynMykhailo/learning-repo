import express, { Request, Response } from "express";
export async function addPosts(req: Request, res: Response) {
  const db = req.app.locals.db;
  console.log("db", await db.read());
}
