"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const date = new Date();
    const currentDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        second: date.getSeconds(),
    };
    const pad = (n) => String(n).padStart(2, "0");
    const formattedDate = `${pad(currentDate.day)}.${pad(currentDate.month)}.${currentDate.year}`;
    const formattedTime = `${pad(currentDate.hours)}:${pad(currentDate.minutes)}:${pad(currentDate.second)}`;
    res.status(200).send(`🕓 current date: ${formattedDate} | ${formattedTime}`);
});
exports.default = router;
