import express, { Request, Response } from "express";

type Post = {
  title: string;
  description: string;
  author: string;
  date: Date;
};

type BlogStorage = Post[];

export class blogControllers {
  private storages;
  constructor(storages: BlogStorage) {
    this.storages = storages;
  }

  createPost(req: Request, res: Response) {
    const { title, description, author } = req.body;
    if (!title || !description || !author) {
      res.status(400);
      throw Error("Not result");
    }
    const date = new Date();
    this.storages.push({ title, description, author, date });
    res.status(200);
  }

  getAllPosts(req: Request, res: Response) {
    res.status(200).json({ data: this.storages });
  }
  getByOne(req: Request, res: Response) {
    res.status(200);
  }
  deleteOnePost(req: Request, res: Response) {
    res.status(200);
  }
}
