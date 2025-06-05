import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError";

// Типизируем как ErrorRequestHandler
export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Проверка на AppError
  if (err instanceof AppError) {
    const { statusCode, status, message, isOperational } = err;

    // ✅ Правильная проверка значения переменной окружения
    if (process.env.NODE_ENV === "development") {
      res.status(statusCode).json({
        status,
        message,
        error: err,
        stack: err.stack,
      });
      return;
    }

    // Операционная (предсказуемая) ошибка
    if (isOperational) {
      res.status(statusCode).json({ status, message });
      return;
    }
  }

  // Неоперационная (непредсказуемая) ошибка
  console.error("UNHANDLED ERROR 💥", err);
  res.status(500).json({
    status: "error",
    message: "Что-то пошло не так!",
  });
  return;
};
