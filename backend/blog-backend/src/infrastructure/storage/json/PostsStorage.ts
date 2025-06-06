import fs from "fs/promises";
import path from "path";
import { Post } from "../../../controllers/interfaces/posts";
import { Storage, ReadOptions } from "../../../core/storage/Storage";

export class PostsStorage extends Storage<Post> {
  private dbPath: string;

  constructor(
    private readonly dbFolder: string = path.join(
      __dirname,
      "../../../storage"
    ),
    private readonly dbFile: string
  ) {
    super();
    this.dbPath = path.join(this.dbFolder, this.dbFile);
  }

  async init(): Promise<void> {
    await fs.mkdir(this.dbFolder, { recursive: true });
    try {
      await fs.access(this.dbPath);
      console.log("[Storage] Database found.");
    } catch {
      await fs.writeFile(this.dbPath, "[]", "utf-8");
      console.log("[Storage] Database created.");
    }
  }

  async read(opts?: ReadOptions): Promise<Post[]> {
    try {
      const raw = await fs.readFile(this.dbPath, "utf-8");
      const data: Post[] = JSON.parse(raw);
      const { offset = 0, limit = data.length } = opts || {};
      return data.slice(offset, offset + limit);
    } catch (error) {
      console.error("[Storage] Read error:", error);
      throw new Error("Failed to read from storage");
    }
  }

  async write(data: Post[]): Promise<void> {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("[Storage] Write error:", error);
      throw new Error("Failed to write to storage");
    }
  }

  async count(): Promise<number> {
    try {
      const raw = await fs.readFile(this.dbPath, "utf-8");
      const data: Post[] = JSON.parse(raw);
      return data.length;
    } catch (error) {
      console.error("[Storage] Count error:", error);
      throw new Error("Failed to count records in storage");
    }
  }
}
