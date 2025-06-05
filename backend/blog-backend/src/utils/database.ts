import fs from "fs/promises";
import path from "path";

const STORAGE_PATH = path.join(__dirname, "../../", "storage");
const DB_NAME = "posts.json";
const DB_PATH = path.join(STORAGE_PATH, DB_NAME);

export async function database() {
  try {
    await fs.mkdir(STORAGE_PATH, { recursive: true });
    try {
      await fs.access(DB_PATH);
      console.log("База данных найдена и подключена.");
    } catch (error) {
      // Файл не существует — создаём пустой JSON-массив
      await fs.writeFile(DB_PATH, "[]", "utf-8");
      console.log("База данных не найдена. Создан новый файл.");
    }

    // Возврат простого интерфейса
    return {
      async read(opts?: { offset?: number; limit?: number }): Promise<any[]> {
        const raw = await fs.readFile(DB_PATH, "utf-8");
        const data = JSON.parse(raw);
        const { offset = 0, limit = data.length } = opts || {};
        return data.slice(offset, offset + limit);
      },
      async write(data: any[]): Promise<void> {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
      },
      async count(): Promise<number> {
        const raw = await fs.readFile(DB_PATH, "utf-8");
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data.length : 0;
      },
      path: DB_PATH,
    };
  } catch (error) {
    console.error("Ошибка инициализации базы данных:", error);
    throw error;
  }
}
