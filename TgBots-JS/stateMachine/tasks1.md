Задания:

1.Создайте State Machine для управления состоянием пользовательской сессии (logged in / logged out).

2.Реализуйте State Machine для телевизора (on / off).

3.Напишите State Machine для браузерного приложения (loading / loaded / error).

4.Создайте State Machine для управления заказами в интернет-магазине (pending / processing / shipped / delivered).

5.Реализуйте State Machine для управления процессом загрузки файла (idle / uploading / completed / error).

6.Напишите State Machine для управления светофором (green / yellow / red).

7.Создайте State Machine для работы с банкоматом (idle / awaitingPin / awaitingTransaction / transactionComplete).

8.Реализуйте State Machine для управления процессом печати документа (idle / printing / completed / error).

9.Напишите State Machine для автомата по продаже напитков (idle / selectingDrink / dispensing / error).

10.Создайте State Machine для управления игровым персонажем (idle / walking / running / jumping / attacking).

Решение
State Machine для управления состоянием пользовательской сессии:

Состояния: logged in, logged out.
Переходы: login, logout.
State Machine для телевизора:

Состояния: on, off.
Переходы: turnOn, turnOff.
State Machine для браузерного приложения:

Состояния: loading, loaded, error.
Переходы: startLoading, finishLoading, encounterError.
State Machine для управления заказами в интернет-магазине:

Состояния: pending, processing, shipped, delivered.
Переходы: placeOrder, processOrder, shipOrder, deliverOrder.
State Machine для управления процессом загрузки файла:

Состояния: idle, uploading, completed, error.
Переходы: startUpload, finishUpload, encounterError.
State Machine для управления светофором:

Состояния: green, yellow, red.
Переходы: switchToGreen, switchToYellow, switchToRed.
State Machine для работы с банкоматом:

Состояния: idle, awaitingPin, awaitingTransaction, transactionComplete.
Переходы: insertCard, enterPin, selectTransaction, completeTransaction.
State Machine для управления процессом печати документа:

Состояния: idle, printing, completed, error.
Переходы: startPrinting, finishPrinting, encounterError.
State Machine для автомата по продаже напитков:

Состояния: idle, selectingDrink, dispensing, error.
Переходы: startSelection, dispenseDrink, encounterError.
State Machine для управления игровым персонажем:

Состояния: idle, walking, running, jumping, attacking.
Переходы: startWalking, startRunning, startJumping, startAttacking.
