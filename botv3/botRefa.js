const BuyDomainsTelegramBot = require("./class/Bot.js");

const bot = new BuyDomainsTelegramBot();

bot.basicMethods.setMyCommands([
  { command: "start", description: "start" },
  { command: "build", description: "build" },
  { command: "zalypa", description: "joke generator" },
]);
bot.basicMethods.hears("start", (context) => {
  context.reply("что делать с зп?", {
    reply_markup: bot.keyboardService.inlineKeyboard([
      { text: "Регистрация", callback_data: "registration" },
      { text: "Настройки", callback_data: "settings" },
    ]),
    parse_mode: "MarkDownV2",
  });
});



bot.basicMethods.action("registration", (context) => {
  bot.stateMap.set(context.chat_id, "waiting_first_name");
  context.reply(`Введите ваше имя:`);

});
bot.basicMethods.action("settings", (context) => {
  context.reply(`Настройки`);
});

bot.startBot();
