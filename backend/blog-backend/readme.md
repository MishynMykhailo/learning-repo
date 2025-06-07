## Мини-проект: API для блога

Создайте API для блога со следующими функциями:

1. Управление постами (создание, чтение, обновление, удаление).
2. Управление комментариями к постам.
3. Фильтрация и сортировка постов.
4. Пагинация результатов.

### Требования:

- Используйте Express Router для организации маршрутов.
- Реализуйте middleware для логирования и проверки авторизации.
- Создайте централизованную систему обработки ошибок.
- Используйте массивы или объекты для хранения данных (без базы данных).
- Добавьте валидацию входных данных.

### Структура API:

```
GET    /api/posts              # Получение всех постов
POST   /api/posts              # Создание нового поста
GET    /api/posts/:id          # Получение поста по ID
PUT    /api/posts/:id          # Обновление поста
DELETE /api/posts/:id          # Удаление поста
GET    /api/posts/:id/comments # Получение комментариев к посту
POST   /api/posts/:id/comments # Добавление комментария к посту
```

### Подсказки:

- Для фильтрации и сортировки используйте параметры запроса.
- Для пагинации используйте параметры `page` и `limit`.
- Для валидации можно использовать простые проверки или библиотеку Joi.
- Для генерации ID можно использовать UUID или простой счетчик.

## Дополнительные ресурсы

1. [Express.js: Routing](https://expressjs.com/en/guide/routing.html)
2. [Express.js: Using middleware](https://expressjs.com/en/guide/using-middleware.html)
3. [Express.js: Error handling](https://expressjs.com/en/guide/error-handling.html)
4. [Multer: File uploads](https://github.com/expressjs/multer)
5. [Express.js: Best practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## Вопросы для самопроверки

1. Что такое маршрутизация в Express.js и как она работает?
2. Какие HTTP-методы поддерживаются в Express.js?
3. Как получить параметры маршрута и параметры строки запроса?
4. Что такое middleware и как оно работает в Express.js?
5. В чем разница между глобальными и локальными middleware?
6. Как обрабатывать ошибки в Express.js?
7. Как организовать маршруты с помощью Express Router?
8. Как обрабатывать асинхронные ошибки в Express.js?
9. Какие встроенные middleware есть в Express.js?
10. Как реализовать загрузку файлов в Express.js?
