// Подключение модуля axios для выполнения HTTP-запросов
const axios = require("axios");

// Подключение переменных среды
require("dotenv").config();
const { TOKEN } = process.env;

// Определение класса BuyDomainsTelegramBot
class BuyDomainsTelegramBot {
  constructor() {
    // Инициализация переменной offset для отслеживания последнего обновления
    this.offset = 0;
    this.isFetchingUpdates = false;
  }

  // Функция для отправки запросов к API Telegram
  async sendTelegramRequest(method, params) {
    try {
      // Выполнение POST-запроса к API Telegram с использованием axios
      const response = await axios.post(
        `https://api.telegram.org/bot${TOKEN}/${method}`, // Формирование URL для запроса
        params // Передача параметров запроса
      );
      // Возврат результата запроса
      return response.data.result;
    } catch (error) {
      // Обработка ошибок при выполнении запроса
      throw error.response.data.description;
    }
  }

  // Обработчик для команды /start
  async handleStart(chatId) {
    // Выполнение запроса на отправку сообщения с приветствием
    await this.sendTelegramRequest("sendMessage", {
      chat_id: chatId, // Идентификатор чата
      text: "Привет! Я простой Telegram бот.", // Текст сообщения
    });
  }

  // Функция для обработки полученных обновлений от Telegram
  async handleUpdate(update) {
    // Проверка, является ли обновление текстовым сообщением
    const message = update.message;
    if (message && message.text) {
      // Извлечение текста сообщения и идентификатора чата
      const text = message.text;
      const chatId = message.chat.id;

      // Обработка команды /start
      if (text === "/start") {
        await this.handleStart(chatId);
      } else {
        // Отправка сообщения о непонимании команды
        await this.sendTelegramRequest("sendMessage", {
          chat_id: chatId,
          text: "Я не понимаю эту команду. Попробуйте еще раз.",
        });
      }
    }
  }

  // Функция для получения обновлений от Telegram
  async getUpdates() {
    if (this.isFetchingUpdates) {
      // Если запрос уже выполняется, пропускаем текущую итерацию
      return;
    }

    try {
      this.isFetchingUpdates = true;
      // Выполнение GET-запроса к API Telegram для получения обновлений
      const response = await axios.get(
        `https://api.telegram.org/bot${TOKEN}/getUpdates`, // URL для получения обновлений
        { params: { offset: this.offset } } // Параметры запроса (указание последнего обновления)
      );
      // Извлечение списка обновлений из ответа
      const updates = response.data.result;

      // Обновление значения offset
      if (updates.length > 0) {
        // Вычисление максимального идентификатора обновления
        const maxUpdateId = Math.max(
          ...updates.map((update) => update.update_id)
        );
        console.log(
          updates.map((update) => {
            console.log(update);
          })
        );

        // Установка нового значения offset
        this.offset = maxUpdateId + 1;
      }

      // Обработка каждого обновления
      updates.forEach((update) => {
        this.handleUpdate(update);
      });
    } catch (error) {
      // Обработка ошибок при получении обновлений
      console.error("Ошибка при получении обновлений:", error);
    } finally {
      this.isFetchingUpdates = false; // Reset the flag after the request is complete
    }
  }

  // Запуск бота
  startBot() {
    // Установка интервала для выполнения запросов на получение обновлений
    setInterval(() => this.getUpdates(), 1000); // Получаем обновления каждую секунду
    console.log("Бот запущен."); // Вывод сообщения о запуске бота
  }
}

// Создание экземпляра класса BuyDomainsTelegramBot и запуск бота
const bot = new BuyDomainsTelegramBot();
bot.startBot();
