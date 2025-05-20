import { Request, Response, NextFunction } from "express";

export function logger(req: Request, _res: Response, next: NextFunction): void {
  const date = new Date();

  const pad = (n: number) => String(n).padStart(2, "0");

  const formattedDate = `${pad(date.getDate())}.${pad(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
  const formattedTime = `${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}`;

  console.log(
    `${req.method} - ${req.originalUrl} - ${formattedDate} | ${formattedTime}`
  );
  next();
}
