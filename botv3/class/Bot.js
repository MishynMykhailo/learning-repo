const axios = require("axios"); // Добавлен импорт axios
const TelegramBotService = require("./TelegramBotService");
const ApiService = require("./ApiService");
const KeyboardService = require("./KeyboardService");
const BasicMethods = require("./BasicMethods");
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
    this.stateMap = new Map();
  }

  async handleUpdate(updates) {
    for (const update of updates) {
      const { message, callback_query } = update;

      // Для кнопок
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
        //  Для текстовых команд
        if (this.basicMethods.callbackHandlers[text]) {
          // Message я передаю как раз все сообщение, чтобы мог его использовать в методе как context
          await this.basicMethods.callbackHandlers[text](message);
        }
        const chatId = message.chat.id;
        const userId = message.from.id;
        const currentState = this.stateMap.get(userId);

        switch (currentState) {
          case "waiting_first_name":
            const firstName = message.text;
            this.stateMap.set(userId, "waiting_last_name");
            await this.basicMethods.sendMessage(
              chatId,
              "Введите вашу фамилию:"
            );
            break;
          case "waiting_last_name":
            const lastName = message.text;
            this.stateMap.set(userId, "waiting_phone");
            await this.basicMethods.sendMessage(
              chatId,
              "Введите ваш номер телефона:"
            );
            break;
          case "waiting_phone":
            const phone = message.text;
            const userData = {
              firstName: firstName,
              lastName: lastName,
              phone: phone,
            };
            console.log("Новый пользователь:", userData);
            this.stateMap.delete(userId);
            await this.basicMethods.sendMessage(
              chatId,
              "Спасибо! Ваша регистрация завершена."
            );
            break;
          default:
            break;
        }
      }
    }
  }

  startBot() {
    setInterval(() => this.botService.getUpdates(), 1000);
    console.log("Бот запущен.");
  }
}

module.exports = Bot;
