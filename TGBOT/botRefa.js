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
      { text: "Отдать ЗП Мише", callback_data: "right" },
      { text: "Оставить себе", callback_data: "left" },
    ]),
    parse_mode: "MarkDownV2",
  });
});
// bot.basicMethods.hears("menu", (context) => {
//   context.reply("Открываем меню", {
//     reply_markup: bot.keyboardService
//       .replyKeyboardMarkup([{ text: "" }, { text: "Левую" }])
//       .resize_keyboard(),
//     parse_mode: "MarkDownV2",
//   });
// });
bot.basicMethods.action("привет", (context) => {
  context.reply(`Пизда отрежу обе ГЫГЫГЫГЫГЫ ${sum()}`);
});
bot.basicMethods.action("right", (context) => {
  context.reply(`Молодец, я жду `);
});
bot.basicMethods.action("left", (context) => {
  context.reply("Неправильно, отдадим Мише, жадина ты");
});
bot.startBot();
