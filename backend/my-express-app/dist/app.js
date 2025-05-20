"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// import indexRouter from "./routes/index";
const users_1 = __importDefault(require("./routes/users"));
const date_1 = __importDefault(require("./routes/date"));
const hello_1 = __importDefault(require("./routes/hello"));
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3006;
// Middleware для парсинга JSON и URL-encoded данных
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Статические файлы
const PUBLIC_DIR = path_1.default.resolve(__dirname, "../public");
app.use(express_1.default.static(PUBLIC_DIR));
// Маршруты
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(PUBLIC_DIR, "index.html"));
});
app.use("/users", users_1.default);
app.use("/date", date_1.default);
app.use("/hello", hello_1.default);
app.use("/api/", todo_1.default);
// Обработка ошибок
app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Что-то пошло не так!");
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
exports.default = app;
