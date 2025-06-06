import path from "path";
import { Comment } from "../../../controllers/interfaces/posts";
import { ReadOptions, Storage } from "../../../core/storage/Storage";
import fs from 'fs/promises'

class CommentsStorage extends Storage<Comment>{
    private dbPath:string;
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
    async init(): Promise<void>{
       await fs.mkdir(this.dbFolder, { recursive: true });
          try {
            await fs.access(this.dbPath);
            console.log("[Storage] Database found.");
          } catch {
            await fs.writeFile(this.dbPath, "[]", "utf-8");
            console.log("[Storage] Database created.");
          }
    }
    async read(opts?: ReadOptions): Promise<Comment[]> {
        try {
            await fs.readFile(this.dbPath);
        } catch (error) {
            console.error("[Storage] Read error:", error);
            throw Error(error)
        }
    }
    async write(data: Comment[]): Promise<void> {
        try {
            await
        } catch (error) {
            console.error("[Storage] Read error:", error);
            throw Error(error)
        }
    }
    async count(): Promise<number> {
        try {
            await
        } catch (error) {
            throw Error(error)
        }
    }
}