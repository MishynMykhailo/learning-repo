import { Request, Response, NextFunction } from "express";

/**
 * Структура записи для отслеживания состояния клиента (по IP)
 */
type RateLimitInfo = {
  count: number; // количество запросов в текущем окне
  expiresAt: number; // метка окончания окна (в ms)
  blockedUntil?: number; // если IP заблокирован — время разблокировки
  timeoutId: NodeJS.Timeout; // id таймера для удаления записи из Map
};

/**
 * Временное хранилище (in-memory) для данных по IP
 * Ключ: строка (IP), Значение: RateLimitInfo
 */
const rateLimitStore = new Map<string, RateLimitInfo>();

/**
 * Конфигурация ограничителя:
 * - WINDOW_MS — продолжительность окна подсчёта
 * - MAX_REQUESTS — допустимое количество запросов в окне
 * - BLOCK_DURATION_MS — блокировка после превышения лимита
 */
const WINDOW_MS = 60 * 1000; // 60 секунд
const MAX_REQUESTS = 5; // максимум 5 запросов за окно
const BLOCK_DURATION_MS = 60 * 1000; // блокировка на 60 секунд

/**
 * Основной middleware: ограничение по числу запросов
 */
export function rateLimit(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Определение IP клиента с учётом прокси
  const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "unknown";
  const now = Date.now();

  // Получение текущей записи (если есть) из памяти
  let record = rateLimitStore.get(ip);

  /**
   * Если IP заблокирован и срок блокировки ещё не истёк —
   * возвращаем ошибку 429 с заголовком Retry-After
   */
  if (record?.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    res.setHeader("Retry-After", retryAfter);
    res.status(429).json({
      error: `Too many requests. Try again in ${retryAfter} seconds.`,
    });
    return;
  }

  /**
   * Если записи нет или окно истекло —
   * сбрасываем счётчик, устанавливаем новое окно и запускаем таймер
   */
  if (!record || now > record.expiresAt) {
    // Удаляем старый таймер (если был), чтобы избежать утечек
    if (record?.timeoutId) clearTimeout(record.timeoutId);

    // Таймер очистки записи через WINDOW_MS
    const timeoutId = setTimeout(() => {
      rateLimitStore.delete(ip);
    }, WINDOW_MS);

    // Создание новой записи и продолжение обработки запроса
    rateLimitStore.set(ip, {
      count: 1,
      expiresAt: now + WINDOW_MS,
      timeoutId,
    });

    next();
    return;
  }

  /**
   * Увеличение счётчика запросов в текущем окне
   */
  record.count += 1;

  /**
   * Если лимит превышен — устанавливаем блокировку
   */
  if (record.count > MAX_REQUESTS) {
    record.blockedUntil = now + BLOCK_DURATION_MS;

    res.setHeader("Retry-After", Math.ceil(BLOCK_DURATION_MS / 1000));
    res.status(429).json({
      error: "Rate limit exceeded. Try again in 60 seconds.",
    });
    return;
  }

  // Обновляем запись и передаём управление дальше
  rateLimitStore.set(ip, record);
  next();
}
