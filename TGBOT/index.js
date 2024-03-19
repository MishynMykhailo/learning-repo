const axios = require("axios");
require("dotenv").config();
const { TOKEN } = process.env;

// Функция для отправки запросов к API Telegram
async function sendTelegramRequest(method, params) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TOKEN}/${method}`,
      params
    );
    return response.data.result;
  } catch (error) {
    throw error.response.data.description;
  }
}

// Обработчик для команды /start
async function handleStart(chatId) {
  await sendTelegramRequest("sendMessage", {
    chat_id: chatId,
    text: "Привет! Я простой Telegram бот.",
  });
}

// Функция для обработки полученных обновлений от Telegram
async function handleUpdate(update) {
  const message = update.message;
  if (message && message.text) {
    const text = message.text;
    const chatId = message.chat.id;

    if (text === "/start") {
      await handleStart(chatId);
    } else {
      await sendTelegramRequest("sendMessage", {
        chat_id: chatId,
        text: "Я не понимаю эту команду. Попробуйте еще раз.",
      });
    }
  }
}

// Функция для получения обновлений от Telegram
async function getUpdates({ offset }) {
  console.log(offset);
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${TOKEN}/getUpdates`,
      { offset: offset + 1 }
    );
    const updates = response.data.result;
    updates.forEach((update) => {
      handleUpdate(update);
    });
  } catch (error) {
    console.error("Ошибка при получении обновлений:", error);
  }
}

// Запуск бота
function startBot() {
  setInterval(() => getUpdates({ offset: 0 }), 1000); // Получаем обновления каждую секунду
}

startBot();
