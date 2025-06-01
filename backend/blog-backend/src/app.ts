import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { logger } from "./utils/logger";
import postsRouter from "./routes/posts";

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
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("404 Not Found");
  });

  // Мидлвара для ошибки
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Что-то пошло не так!");
  });
  return app;
}

export default createApp;
