const axios = require("axios");
const ApiService = require("./class/ApiService");
const BasicMethods = require("./class/BasicMethods");
const TelegramUpdates = require("./class/TelegramUpdates");
require("dotenv").config();
const { token } = process.env;
const apiUrl = `https://api.telegram.org/bot${token}`;

class TelegramBot {
  constructor() {
    this.stateMap = new Map();
    this.apiService = new ApiService();
    this.basicMethods = new BasicMethods({ apiService: this.apiService });
    this.telegramUpdates = new TelegramUpdates({
      apiService: this.apiService,
      bot: this,
    });

    this.startBot();
  }

  async handleStart(msg) {
    const chatId = msg.chat.id;
    await this.basicMethods.sendMessage({
      chat_id: chatId,
      text: "Добро пожаловать! Нажмите /registration для начала регистрации.",
    });
  }

  async handleRegistration(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    this.stateMap.set(userId, "waiting_first_name");
    await this.basicMethods.sendMessage({
      chat_id: chatId,
      text: "Введите ваше имя:",
    });
  }

  async handleMessage(msg) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const currentState = this.stateMap.get(userId);

    switch (currentState) {
      case "waiting_first_name":
        const firstName = msg.text;
        this.stateMap.set(userId, "waiting_last_name");
        await this.basicMethods.sendMessage({
          chat_id: chatId,
          text: "Введите вашу фамилию:",
        });
        break;
      case "waiting_last_name":
        const lastName = msg.text;
        this.stateMap.set(userId, "waiting_phone");
        await this.basicMethods.sendMessage({
          chat_id: chatId,
          text: "Введите ваш номер телефона:",
        });
        break;
      case "waiting_phone":
        const phone = msg.text;
        const userData = {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
        };
        console.log("Новый пользователь:", userData);
        this.stateMap.delete(userId);
        await this.basicMethods.sendMessage({
          chat_id: chatId,
          text: "Спасибо! Ваша регистрация завершена.",
        });
        break;
      default:
        await this.basicMethods.sendMessage({
          chat_id: chatId,
          text: "Чтобы начать регистрацию, нажмите /registration.",
        });
        break;
    }
  }

  async handleUpdate(updates) {
    for (const update of updates) {
      const msg = update.message;
      if (!msg) return;
      if (msg.text === "/start") {
        await this.handleStart(msg);
      } else if (msg.text === "/registration") {
        await this.handleRegistration(msg);
      } else {
        await this.handleUpdate(msg);
      }
    }
  }

  startBot() {
    setInterval(() => this.telegramUpdates.getUpdates(), 1000);
    console.log("Бот запущен.");
  }
}
const bot = new TelegramBot();
