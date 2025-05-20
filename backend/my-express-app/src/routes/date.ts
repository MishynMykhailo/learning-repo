import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const date = new Date();
  const currentDate = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    second: date.getSeconds(),
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  const formattedDate = `${pad(currentDate.day)}.${pad(currentDate.month)}.${
    currentDate.year
  }`;
  const formattedTime = `${pad(currentDate.hours)}:${pad(
    currentDate.minutes
  )}:${pad(currentDate.second)}`;

  res.status(200).send(`🕓 current date: ${formattedDate} | ${formattedTime}`);
});

export default router;
