import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Список пользователей");
});

router.get("/:id", (req: Request, res: Response) => {
  res.send(`Пользователь с ID: ${req.params.id}`);
});

export default router;
