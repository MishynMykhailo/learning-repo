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
      { text: "Регистрация", callback_data: "registration" },
      { text: "Настройки", callback_data: "settings" },
    ]),
    parse_mode: "MarkDownV2",
  });
});



bot.basicMethods.action("registration", (context) => {
  context.reply(`Регистрация`);
});
bot.basicMethods.action("settings", (context) => {
  context.reply(`Настройки`);
});

bot.startBot();
