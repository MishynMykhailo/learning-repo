Введение в State Machines
Что такое State Machine?
State Machine (автомат состояний) - это математическая модель, которая описывает все возможные состояния, которые может принимать объект, и переходы между этими состояниями в ответ на внешние события.

Зачем использовать State Machine?
Использование State Machine позволяет создавать программы с ясной логикой переходов между состояниями, что облегчает понимание кода и управление его поведением.

Как использовать State Machine на JavaScript/Node.js?
На JavaScript для создания State Machine можно использовать различные подходы, включая функциональный и объектно-ориентированный. В данном материале мы рассмотрим оба варианта.

# Функциональный подход

В функциональном подходе состояние представляется как простой объект JavaScript, а функции используются для изменения этого состояния в ответ на внешние события.

Пример:

```
// Создаем State Machine
function createStateMachine(initialState) {
  let state = initialState;

  // Функция для изменения состояния
  function transition(newState) {
    state = newState;
  }

  // Функция для получения текущего состояния
  function getState() {
    return state;
  }

  return {
    transition,
    getState
  };
}

// Пример использования State Machine
const trafficLight = createStateMachine("green");

console.log(trafficLight.getState()); // Выводит "green"

trafficLight.transition("yellow");
console.log(trafficLight.getState()); // Выводит "yellow"
```

# Объектно-ориентированный подход

В объектно-ориентированном подходе каждое состояние представляется как отдельный объект, а переходы между состояниями управляются методами этих объектов.

Пример:

```
// Создаем класс состояния
class State {
  constructor(name) {
    this.name = name;
  }

  // Метод для изменения состояния
  transition(machine, newState) {
    console.log(`Transitioning from ${this.name} to ${newState}`);
    machine.setState(newState);
  }
}

// Создаем класс State Machine
class StateMachine {
  constructor(initialState) {
    this.state = new State(initialState);
  }

  // Метод для изменения состояния
  setState(newState) {
    this.state = new State(newState);
  }

  // Метод для получения текущего состояния
  getState() {
    return this.state.name;
  }
}

// Пример использования State Machine
const trafficLight = new StateMachine("green");

console.log(trafficLight.getState()); // Выводит "green"

trafficLight.state.transition(trafficLight, "yellow");
console.log(trafficLight.getState()); // Выводит "yellow"
```
