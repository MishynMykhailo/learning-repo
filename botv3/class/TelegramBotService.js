const axios = require("axios");
const ApiService = require("./ApiService");
require("dotenv").config();
class TelegramBotService {
  constructor({ apiService, bot }) {
    this.offset = 0;
    this.isFetchingUpdates = false;
    this.bot = bot;
    this.apiService = apiService;
  }

  async getUpdates() {
    if (this.isFetchingUpdates) {
      // If a request is already in progress, skip this iteration
      return;
    }
    try {
      this.isFetchingUpdates = true; // Set the flag to indicate that a request is in progress

      const response = await this.apiService.get("getUpdates", {
        offset: this.offset + 1,
      });
      const updates = response.data.result;

      if (updates.length > 0) {
        await this.bot.handleUpdate(updates);
      }
      // Update the offset
      if (updates.length > 0) {
        this.updateOffset(updates);
      }
    } catch (error) {
      console.error("Error getting updates:", error);
    } finally {
      this.isFetchingUpdates = false; // Reset the flag after the request is complete
    }
  }
  // Функция для обновления апдейта, чтобы не флудились сообщения
  updateOffset(updates) {
    const maxUpdateId = Math.max(...updates.map((update) => update.update_id));
    // Обновляем смещение
    this.offset = maxUpdateId;
  }
}
module.exports = TelegramBotService;
