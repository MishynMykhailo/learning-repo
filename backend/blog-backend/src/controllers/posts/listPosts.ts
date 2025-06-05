import express, { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";

interface PaginationQuery {
  page?: string;
  limit?: string;
}

export async function listPosts(
  req: Request<unknown, unknown, unknown, PaginationQuery>,
  res: Response,
  next: NextFunction
) {
  const db = req.app.locals.db;
  const { page, limit, offset } = parsePagination(req.query);

  try {
    const [items, total] = await Promise.all([
      db.read({ offset, limit }),
      db.count(),
    ]);

    res.status(200).json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    next(new AppError({ message, statusCode: 400 }));
  }
}

function parsePagination(
  query: PaginationQuery,
  defaults = { page: 1, limit: 10 }
) {
  const page =
    Number.isInteger(Number(query.page)) && Number(query.page) > 0
      ? Number(query.page)
      : defaults.page;

  const limit =
    Number.isInteger(Number(query.limit)) && Number(query.limit) > 0
      ? Number(query.limit)
      : defaults.limit;
  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

// Добавить вывод пагинации
/*
Логика как работает пагинация и для чего она вообще
1. Пагинация нужна чтобы разбить запросы на определенные части, чтобы не так грузить страницу и бд
Как сделать:
1.задаем минимальное limit при одном запросе и максимальный который может указать пользователь, начнем с минимального
2. page = x, limit = 10 - default значения
3. добавляем чтобы если в запросе нет limit,то оно само стало 10
4. считаем сколько страниц у нас есть с текущими данными, я беру фулл число постов
Расчет:
число постов - допустим 5
limit = 10 
5/10 = 0,5 и округляем в большую сторону, получается 1
и когда мы делаем запрос, мы берем (вот тут вопрос как понимать какие мы листы уже брали и данные на них, а какие нет?)
*/
