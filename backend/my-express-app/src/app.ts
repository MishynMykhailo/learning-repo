import express, { Request, Response, NextFunction } from "express";
import path from "path";

// import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import dateRouter from "./routes/date";
import helloRouter from "./routes/hello";
import todoRouter from "./routes/todo";

const app = express();
const port = process.env.PORT || 3006;

// Middleware для парсинга JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Статические файлы
const PUBLIC_DIR = path.resolve(__dirname, "../public");

app.use(express.static(PUBLIC_DIR));

// Маршруты
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});
app.use("/users", usersRouter);
app.use("/date", dateRouter);
app.use("/hello", helloRouter);
app.use("/api/", todoRouter);

// Обработка ошибок
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404 Not Found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Что-то пошло не так!");
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

export default app;
