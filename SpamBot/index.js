require("dotenv").config();
const SpamBot = require("./class/Bot.js");
const cron = require("node-cron");
const bot = new SpamBot();
const { groupId } = process.env;
console.log(groupId);
cron.schedule(
  "00 11 * * *",
  () => {
    bot.basicMethods.sendMessage(groupId, "Зайдите в дискорд");
  },
  { timezone: "Europe/Kiev" }
); // Поместите опцию timezone внутрь самой функции schedule

bot.startBot();
