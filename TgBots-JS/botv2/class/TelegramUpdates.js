const axios = require("axios");
const ApiService = require("./ApiService");
require("dotenv").config();

class TelegramUpdates {
  constructor({ apiService, bot }) {
    this.offset = 0;
    this.isFetchingUpdates = false;
    this.bot = bot;
    this.apiService = apiService;
  }

  async getUpdates() {
    if (this.isFetchingUpdates) {
      // Если запрос уже выполняется, пропускаем текущую итерацию
      return;
    }
    try {
      this.isFetchingUpdates = true; // Устанавливаем флаг для указания того, что запрос выполняется

      const response = await this.apiService.get("getUpdates", {
        offset: this.offset + 1,
      });
      const updates = response.data.result;

      if (updates.length > 0) {
        await this.bot.handleUpdate(updates);
      }
      // Обновляем смещение
      if (updates.length > 0) {
        this.updateOffset(updates);
      }
    } catch (error) {
      console.error("Ошибка при получении обновлений:", error);
    } finally {
      this.isFetchingUpdates = false; // Сбрасываем флаг после завершения запроса
    }
  }

  // Функция для обновления смещения
  updateOffset(updates) {
    const maxUpdateId = Math.max(...updates.map((update) => update.update_id));
    // Обновляем смещение
    this.offset = maxUpdateId;
  }
}

module.exports = TelegramUpdates;
