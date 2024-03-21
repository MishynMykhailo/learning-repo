const axios = require("axios"); // Добавлен импорт axios
const TelegramBotService = require("./TelegramBotService");
const ApiService = require("./ApiService");
const KeyboardService = require("./KeyboardService");
const BasicMethods = require("./BasicMethods");
const StateMachine = require("./StateMachine");
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
    //  Место для стейта
    this.stateMachine = new StateMachine();
  }
  // Тут как раз обрабатываются апдейты которые пришли от телеграма
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
        //  Вот тут стейт и тут проблемы
        if (this.stateMachine.getCurrentState() !== null) {
          const currentState = this.stateMachine.getCurrentState();
          const { steps } =
            this.stateMachine.getStates()[this.stateMachine.getCurrentState()];
          const currentIndex = this.stateMachine.getCurrentStateIndex();
          this.stateMachine.changeValue(currentState, currentIndex, text);
          const lengthCurrentSteps = steps.length - 1;

          // Если текущий индекс состояния равен длине всех шагов
          if (currentIndex === lengthCurrentSteps) {
            // Получаем обработчик текущего состояния и выполняем его
            const handler = this.stateMachine.getStates()[currentState].handler;
            await handler(message);

            // Очищаем текущее состояние
            this.stateMachine.chooseCurrentState(null);
          } else {
            // Отправляем описание текущего шага
            const currentStep = steps[currentIndex];
            await this.basicMethods.sendMessage(
              message.chat.id,
              currentStep.description
            );
            // Увеличиваем индекс состояния
            this.stateMachine.addCurrentStateIndex(lengthCurrentSteps);
          }
        }

        // Process commands - для команд в которых есть "/", то есть те, команды которые сделаны через hears в basicMethods
        if (text.startsWith("/")) {
          const command = text.slice(1); // удаляем "/"
          if (this.basicMethods.commandHandlers[command]) {
            // Message я передаю как раз все сообщение, чтобы мог его использовать в методе как context
            await this.basicMethods.commandHandlers[command](message);
          }
        }
        // Для команд которые сделаны через action в basicMethods
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
