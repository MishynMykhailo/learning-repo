import express, { NextFunction, Request, Response } from "express";
export function logger(req: Request, _res: Response, next: NextFunction) {
  const { method, originalUrl } = req;
  const formatedLog = `${method} - ${originalUrl} - ${formatedDate()} - ${formatedTime()}`;
  console.log(formatedLog);
  next();
}
// Приводим полученное число к формату строки и добавляем к нему 0
function padZero(n: number): string {
  return String(n).padStart(2, "0");
}
// Форматируем дату
function formatedDate(date: Date = new Date()): string {
  // Форматируем день
  const day = padZero(date.getDate());
  // Форматируем месяц
  const month = padZero(date.getMonth());
  // Получаем полный год
  const year = date.getFullYear();
  // Комбинируем и возвращаем результат
  return `${day}.${month}.${year}`;
}
// Форматируем время
function formatedTime(date: Date = new Date()): string {
  // Форматируем часы
  const hours = padZero(date.getHours());
  // Форматируем минуты
  const minutes = padZero(date.getMinutes());
  // Форматируем секунды
  const seconds = padZero(date.getSeconds());
  // Комбинируем и возвращаем результат
  return `${hours}h:${minutes}m:${seconds}s`;
}
