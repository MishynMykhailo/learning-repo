class StateMachine {
  constructor() {
    this.state = null;
  }

  // Метод для изменения состояния
  changeState(newState) {
    this.state = newState;
  }

  // Метод для обработки ввода данных
  handleInput(inputData) {
    // Этот метод должен быть переопределен в дочерних классах
    throw new Error("Метод handleInput должен быть переопределен");
  }

  // Метод для получения текущего состояния
  getState() {
    console.log(this.state);
    return this.state;
  }
}
// Main State
class MainStateMachine extends StateMachine {
  constructor() {
    super();
    this.changeState("main");
  }
  handleInput(action) {
    switch (action) {
      case "registration":
        this.changeState("registration");
        return "Введите ваше имя для регистрации:";
      case "login":
        this.changeState("login");
        return "Введите ваше имя для входа:";
      default:
        return "Некорректное действие в состоянии main";
    }
  }
}
// Registration State
class RegistrationStateMachine extends StateMachine {
  constructor() {
    super();
    this.changeState("registration");
  }

  handleInput(inputData) {
    switch (inputData) {
      case "start":
        this.userData.firstName = inputData;
        this.state = "inputLastName";
        return "Введите вашу фамилию:";
      case "inputLastName":
        this.userData.lastName = inputData;
        this.state = "inputEmail";
        return "Введите вашу почту:";
      case "inputEmail":
        this.userData.email = inputData;
        this.state = "inputPhoneNumber";
        return "Введите ваш номер телефона:";
      case "inputPhoneNumber":
        this.userData.phoneNumber = inputData;
        this.state = "confirmData";
        return this.confirmUserData();
      default:
        return "Некорректное состояние";
    }
  }
  confirmUserData() {
    this.changeState("main");
    return "Регистрация успешно завершена. Выберите действие:";
  }
}
// Login state
class LoginStateMachine extends StateMachine {
  constructor() {
    super();
    this.changeState("login");
  }

  handleInput(inputData) {
    switch (inputData) {
      case "Введите логин":
        return;
      case "Введите номер":
        return;
      default:
        return "Некорректное состояние";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");
  const registrationBtn = document.getElementById("registrationBtn");
  const loginBtn = document.getElementById("loginBtn");

  const mainStateMachine = new MainStateMachine();
  const registrationStateMachine = new RegistrationStateMachine();
  const loginStateMachine = new LoginStateMachine();

  registrationBtn.addEventListener("click", () => {
    const nextState = mainStateMachine.handleInput("registration");
    output.textContent = nextState;
  });

  loginBtn.addEventListener("click", () => {
    const nextState = mainStateMachine.handleInput("login");
    output.textContent = nextState;
  });
});
