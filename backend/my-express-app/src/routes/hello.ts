import express, { Request, Response } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const params = req.body;
  res.send(`Привет, ${params.name}`);
});

export default router;
