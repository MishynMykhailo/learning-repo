import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { logger } from "./utils/logger";
import postsRouter from "./routes/posts";
import { AppError } from "./utils/AppError";
import { errorHandler } from "./middleware/errorHandler";

function createApp() {
  const app = express();

  // Middleware для парсинга JSON и URL-encoded данных
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Middleware хелперы
  app.use(logger);

  // Публичный путь
  const PUBLIC_DIR = path.resolve(__dirname, "../public");
  // Путь к статическим файлам
  app.use(express.static(PUBLIC_DIR));

  // Роуты
  app.use("/api/posts", postsRouter);

  // Мидл вара если не найден запрос
  app.use((req, res, next) => {
    next(
      new AppError({
        message: `Cannot ${req.method} ${req.originalUrl}`,
        statusCode: 404,
      })
    );
  });

  // Мидлвара для ошибки
  app.use(errorHandler);
  return app;
}

export default createApp;
