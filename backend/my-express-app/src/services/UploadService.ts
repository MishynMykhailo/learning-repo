import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

export class UploadService {
  private uploadDir: string;
  private maxSizeMb: number;
  private allowedTypes: string[];

  constructor(
    uploadDir = path.resolve(__dirname, "../uploads"),
    maxSizeMb = 5,
    allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
  ) {
    this.uploadDir = uploadDir;
    this.maxSizeMb = maxSizeMb;
    this.allowedTypes = allowedTypes;
    this.ensureUploadDir();
  }

  private ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private storage(): StorageEngine {
    return multer.diskStorage({
      destination: (_, __, cb) => cb(null, this.uploadDir),
      filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext);
        const timestamp = Date.now();
        cb(null, `${base}-${timestamp}${ext}`);
      },
    });
  }

  private fileFilter(): (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => void {
    return (_, file, cb) => {
      if (this.allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Недопустимый тип файла"));
      }
    };
  }

  public single(fieldName: string) {
    return multer({
      storage: this.storage(),
      limits: { fileSize: this.maxSizeMb * 1024 * 1024 },
      fileFilter: this.fileFilter(),
    }).single(fieldName);
  }

  public array(fieldName: string, maxCount = 5) {
    return multer({
      storage: this.storage(),
      limits: { fileSize: this.maxSizeMb * 1024 * 1024 },
      fileFilter: this.fileFilter(),
    }).array(fieldName, maxCount);
  }

  public fields(fieldMap: { name: string; maxCount: number }[]) {
    return multer({
      storage: this.storage(),
      limits: { fileSize: this.maxSizeMb * 1024 * 1024 },
      fileFilter: this.fileFilter(),
    }).fields(fieldMap);
  }
}

// 🧩 1. Создай сервис UploadService
// Название файла: services/UploadService.ts

// Это TypeScript-класс, который:

// хранит путь к папке загрузки (uploadDir);

// задаёт максимальный размер файла (maxSizeMb);

// ограничивает допустимые MIME-типы (allowedTypes);

// инкапсулирует логику multer.diskStorage, fileFilter, limits.

// ⚙️ 2. В конструкторе:
// Принимает параметры:

// путь к директории загрузки (по умолчанию ../../uploads);

// максимальный размер файла в мегабайтах (по умолчанию 5);

// массив допустимых MIME-типов.

// Проверяет и создаёт папку загрузки через fs.mkdirSync.

// 🗂 3. Метод storage()
// Возвращает конфигурацию multer.diskStorage:

// сохраняет файл в uploadDir;

// генерирует имя вида имя-файла-timestamp.расширение.

// 🔒 4. Метод fileFilter()
// Проверяет MIME-тип файла;

// Разрешает только указанные типы (jpeg, png, pdf);

// Остальные — отклоняет с ошибкой.

// 🧪 5. Методы интерфейса загрузки
// single(fieldName) — загрузка одного файла (аналог .single() в multer);

// array(fieldName, maxCount) — загрузка массива файлов;

// fields([{ name, maxCount }, ...]) — загрузка нескольких полей с файлами.

// Каждый из них возвращает middleware, готовое к использованию в router.post().

// 🔌 6. Использование в роутах
// В роуте нужно:

// импортировать UploadService;

// создать экземпляр: const uploader = new UploadService();

// использовать в роуте: router.post(..., uploader.single("file"), ...)

// 💡 Пример подключения в routes/upload.ts
// ts
// Копировать
// Редактировать
