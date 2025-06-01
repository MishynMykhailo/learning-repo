import express from "express";
import "dotenv/config";
import { database } from "./utils/database";
import createApp from "./app";

const PORT = process.env.PORT || 3004;

(async () => {
  try {
    const db = await database();
    const app = createApp();
    app.locals.db = db;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Fatal error during startup:", error);
    process.exit(1);
  }
})();
