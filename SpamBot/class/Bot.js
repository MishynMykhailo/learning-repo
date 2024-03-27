const TelegramBotService = require("./TelegramBotService");
const ApiService = require("./ApiService");
const KeyboardService = require("./KeyboardService");
const BasicMethods = require("./BasicMethods");
const StateRegistration = require("./StateRegistration");
require("dotenv").config();

class Bot {
  constructor() {
    //   Для создания запросов
    this.apiService = new ApiService();
    // Базовая обработка методов
    this.basicMethods = new BasicMethods({
      apiService: this.apiService,
    });
    // Для логики обновления сообщений
    this.botService = new TelegramBotService({
      apiService: this.apiService,
      bot: this,
    });
    this.keyboardService = new KeyboardService(this.apiService);
    //  Место для хранения коллбеков
    this.registration = new StateRegistration({ bot: this });
  }

  async handleUpdate(updates) {
    for (const update of updates) {
    }
  }

  startBot() {
    setInterval(() => this.botService.getUpdates(), 1000);
    console.log("Бот запущен.");
  }
}

module.exports = Bot;
