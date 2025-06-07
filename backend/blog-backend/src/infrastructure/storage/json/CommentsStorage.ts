import fs from "fs/promises";
import path from "path";
import { ReadOptions, Storage } from "../../../core/storage/Storage";
import { Comment } from "../../../controllers/interfaces/comment";

export class CommentsStorage extends Storage<Comment> {
  private dbPath: string;

  constructor(
    private readonly dbFolder: string = path.join(
      __dirname,
      "../../../storage"
    ),
    private readonly dbFile: string = "comments.json"
  ) {
    super();
    this.dbPath = path.join(this.dbFolder, this.dbFile);
    this.init();
  }

  async init(): Promise<void> {
    await fs.mkdir(this.dbFolder, { recursive: true });
    try {
      await fs.access(this.dbPath);
      console.log("[Storage] Comments DB found.");
    } catch {
      await fs.writeFile(this.dbPath, "[]", "utf-8");
      console.log("[Storage] Comments DB created.");
    }
  }

  async read(): Promise<Comment[]> {
    try {
      const raw = await fs.readFile(this.dbPath, "utf-8");
      return JSON.parse(raw);
    } catch (error) {
      console.error("[Storage] Read error:", error);
      throw new Error("Failed to read comments");
    }
  }

  async readByPostId(postId: string): Promise<Comment[]> {
    const all = await this.read();
    return all.filter((comment) => comment.postId === postId);
  }

  async write(data: Comment[]): Promise<void> {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("[Storage] Write error:", error);
      throw new Error("Failed to write comments");
    }
  }

  async count(): Promise<number> {
    try {
      const raw = await fs.readFile(this.dbPath, "utf-8");
      const data: Comment[] = JSON.parse(raw);
      return data.length;
    } catch (error) {
      console.error("[Storage] Count error:", error);
      throw new Error("Failed to count comments");
    }
  }

  async countByPostId(postId: string): Promise<number> {
    const all = await this.read();
    return all.filter((comment) => comment.postId === postId).length;
  }
}
