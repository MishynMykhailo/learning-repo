import { Request, Response, NextFunction } from "express";

export default function uploadFiles(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.file) {
    res.status(400).json({ error: "Файл не загружен" });
    return;
  }
  console.log("req.file", req.file);
  res.status(200).json({
    message: `Файл создан с названием: ${req.file.filename}`,
    mimetype: req.file.mimetype,
  });
}
