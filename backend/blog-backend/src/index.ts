import express from "express";
import "dotenv/config";
import createApp from "./app";
import { PostsStorage } from "./infrastructure/storage/json/PostsStorage";
import { CommentsStorage } from "./infrastructure/storage/json/CommentsStorage";
import path from "path";
const PORT = process.env.PORT || 3004;

(async () => {
  try {
    const DB_PATH = path.join(__dirname, "../storage");
    const dbPost = new PostsStorage(DB_PATH, "posts.json");
    const dbComment = new CommentsStorage(DB_PATH, "comments.json");
    const app = createApp();
    app.locals.db = { dbPost, dbComment };
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Fatal error during startup:", error);
    process.exit(1);
  }
})();
