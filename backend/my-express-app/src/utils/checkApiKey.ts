import { Request, Response, NextFunction } from "express";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.query.apiKey;
  if (!apiKey || apiKey !== "secret-key") {
    res.status(401).send("Неверный API-ключ");
    return;
  }
  next();
}
