const axios = require("axios"); // Добавлен импорт axios
const TelegramBotService = require("./TelegramBotService");
const ApiService = require("./ApiService");
const KeyboardService = require("./KeyboardService");
const BasicMethods = require("./BasicMethods");
require("dotenv").config();

class BuyDomainsTelegramBot {
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
      buyDomainsBot: this,
    });
    this.keyboardService = new KeyboardService(this.apiService);
    //  Место для хранения коллбеков
  }

  async handleUpdate(updates) {
    for (const update of updates) {
      const { message, callback_query } = update;

      // console.log("update", update);
      // console.log("callback_query", callback_query);

      // callback_query logics
      if (callback_query) {
        const { data, message } = callback_query;
        if (this.basicMethods.callbackHandlers[data]) {
          await this.keyboardService.answerCallbackQuery(callback_query.id);
          await this.basicMethods.callbackHandlers[data](message);
        }
      }

      // commands this text with "/"

      if (message) {
        const text = message.text;
        // Process commands
        if (text.startsWith("/")) {
          const command = text.slice(1); // удаляем "/"
          if (this.basicMethods.commandHandlers[command]) {
            // Message я передаю как раз все сообщение, чтобы мог его использовать в методе как context
            await this.basicMethods.commandHandlers[command](message);
          }
        }
        if (this.basicMethods.callbackHandlers[text]) {
          // Message я передаю как раз все сообщение, чтобы мог его использовать в методе как context
          await this.basicMethods.callbackHandlers[text](message);
        }
      }
    }
  }

  startBot() {
    setInterval(() => this.botService.getUpdates(), 1000);
    console.log("Бот запущен.");
  }
}

module.exports = BuyDomainsTelegramBot;
