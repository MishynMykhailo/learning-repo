// 1.Создайте State Machine для управления состоянием пользовательской сессии (logged in / logged out).
// Тут состояние
class State {
  constructor(name) {
    this.name = name;
  }

  transition(machine, newState) {
    console.log(`Transitioning from ${this.name} to ${newState}`);
    machine.setState(newState);
  }
}

// Реализация задания
class UserSession {
  constructor(initialState) {
    this.state = new State(initialState);
  }
  setState(newState) {
    this.state.transition(newState);
  }
  getState() {
    console.log(this.state.name);
    return this.state.name;
  }
}

const firstUser = new UserSession("login");
firstUser.getState();
firstUser.setState("Logout");
firstUser.getState();
// 2.Реализуйте State Machine для телевизора (on / off).

// 3.Напишите State Machine для браузерного приложения (loading / loaded / error).

// 4.Создайте State Machine для управления заказами в интернет-магазине (pending / processing / shipped / delivered).

// 5.Реализуйте State Machine для управления процессом загрузки файла (idle / uploading / completed / error).

// 6.Напишите State Machine для управления светофором (green / yellow / red).

// 7.Создайте State Machine для работы с банкоматом (idle / awaitingPin / awaitingTransaction / transactionComplete).

// 8.Реализуйте State Machine для управления процессом печати документа (idle / printing / completed / error).

// 9.Напишите State Machine для автомата по продаже напитков (idle / selectingDrink / dispensing / error).

// 10.Создайте State Machine для управления игровым персонажем (idle / walking / running / jumping / attacking).
