const BuyDomainsTelegramBot = require("./class/BuyDomainsTelegramBot.js");

const bot = new BuyDomainsTelegramBot();

bot.basicMethods.setMyCommands([
  { command: "start", description: "start" },
  { command: "build", description: "build" },
  { command: "zalypa", description: "joke generator" },
]);
bot.basicMethods.hears("start", (context) => {
  context.reply("что делать с зп?", {
    reply_markup: bot.keyboardService.inlineKeyboard([
      { text: "Регистрация", callback_data: "register" },
      { text: "Настройки", callback_data: "settings" },
    ]),
    parse_mode: "MarkDownV2",
  });
});
// Состояния
// bot.stateMachine.addState("register", [
//   { name: "FirstName", description: "Enter your first name", value: "" },
//   { name: "LastName", description: "Enter your last name", value: "" },
//   { name: "Email", description: "Enter your email", value: "" },
// ]);
// const currentState = this.stateMachine.getCurrentState();
// console.log("currenteState", currentState);
// const getState =
//   this.stateMachine.getStates()[
//     this.stateMachine.getCurrentState()
//   ];
// const currentIndex = this.stateMachine.getCurrentStateIndex();
// this.stateMachine.changeValue(currentState, currentIndex, text);
// const lengthCurrentSteps = getState.length;
// console.log("length", lengthCurrentSteps);
// this.stateMachine.addCurrentStateIndex(lengthCurrentSteps);
// console.log(this.stateMachine.getCurrentStateIndex());
// console.log(getState);
// console.log(this.stateMachine.getStates());




// Как задаю стейт сейчас
bot.stateMachine.addState("register", {
  steps: [
    {
      name: "FirstName",
      description: "Enter your first name",
      value: "",
    },
    {
      name: "LastName",
      description: "Enter your last name",
      value: "",
    },
    { name: "Email", description: "Enter your email", value: "" },
  ],
  handler: (message) => {
    console.log(message);
    return message
  },
});
bot.stateMachine.addState("settings", [
  { name: "privacy", description: "Enter your first name", value: "" },
  { name: "terms", description: "Enter your last name", value: "" },
  { name: "ffff", description: "Enter your email", value: "" },
]);

// bot.basicMethods.hears("menu", (context) => {
//   context.reply("Открываем меню", {
//     reply_markup: bot.keyboardService
//       .replyKeyboardMarkup([{ text: "" }, { text: "Левую" }])
//       .resize_keyboard(),
//     parse_mode: "MarkDownV2",
//   });
// });
bot.basicMethods.action("register", async (context) => {
  // 1. вывести сообщение началась регистрация
  // 2.Задать состояние или стейт что будет регистрация и прочитываем какие шаги внутри
  // 3.Задать состояние текущим и вывести описание этого шага
  // Это уже нужно делать в классе бота в моем случае buyDomainsTelegram
  // 4. юзер отправляте ответ и мы должны сохранить введенные данные в название этого шага
  // 5. Задать следующий шаг
  context.reply("Введите ваше имя");
  bot.stateMachine.chooseCurrentState("register");
});
// bot.basicMethods.action("register", async (context) => {
//   bot.stateMachine.addState("register", [
//     { name: "FirstName", description: "Enter your first name", value: "" },
//     { name: "LastName", description: "Enter your last name", value: "" },
//     { name: "Email", description: "Enter your email", value: "" },
//   ]);

//   bot.stateMachine.chooseCurrentState("register");
//   console.log(bot.stateMachine.getCurrentState());
//   // 1. вывести сообщение началась регистрация
//   // 2.Задать состояние или стейт что будет регистрация и прочитываем какие шаги внутри
//   // 3.Задать состояние текущим и вывести описание этого шага
//   // Это уже нужно делать в классе бота в моем случае buyDomainsTelegram
//   // 4. юзер отправляте ответ и мы должны сохранить введенные данные в название этого шага
//   // 5. Задать следующий шаг
//   const { message } = context;

//   // Шаги регистрации

//   // Получаем текущий шаг пользователя
//   const currentStepIndex = steps.findIndex(
//     (step) => step.name === bot.currentState
//   );
//   const currentStep = steps[currentStepIndex];

//   // Если пользователь находится на последнем шаге, то заканчиваем регистрацию
//   if (currentStepIndex === steps.length - 1) {
//     // Выполняем необходимые действия для завершения регистрации
//     await context.reply("Спасибо за регистрацию!");

//     // Сбрасываем состояние пользователя после завершения регистрации
//     bot.currentState = null;
//   } else {
//     // Получаем следующий шаг
//     const nextStep = steps[currentStepIndex + 1];

//     // Отправляем пользователю вопрос текущего шага
//     await context.reply(nextStep.question);

//     // Задаем состояние текущим шагом
//     bot.currentState = nextStep.name;
//   }
// });
bot.basicMethods.action("settings", async (context) => {
  stateMachine.addState("settings", [
    { name: "AllSettings", description: "View all settings" },
    { name: "PrivacySettings", description: "Adjust privacy settings" },
  ]);
});
bot.startBot();
