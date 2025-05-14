const formRegistration = document.getElementById("formRegistration");
const message = document.getElementById("formRegistration__text");
const userData = document.getElementById("formRegistration__input");
const userBtn = document.getElementById("formRegistration__btn");

class StateMachine {
  constructor(initialState) {
    this.state = initialState;
  }

  // Метод для изменения состояния и обработки ввода данных
  transition(inputData) {
    // Этот метод должен быть переопределен в дочерних классах
    throw new Error("Метод transition должен быть переопределен");
  }

  // Метод для получения текущего состояния
  getState() {
    return this.state;
  }
}

// Пример использования для конкретной State Machine (регистрация пользователя)
class UserRegistrationStateMachine extends StateMachine {
  constructor() {
    super("start");
    this.userData = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
  }

  // Переопределение метода transition для конкретной State Machine
  transition(inputData) {
    switch (this.state) {
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

  // Метод для подтверждения данных пользователя
  confirmUserData() {
    return `Подтвердите введенные данные:\nИмя: ${this.userData.firstName}\nФамилия: ${this.userData.lastName}\nПочта: ${this.userData.email}\nНомер телефона: ${this.userData.phoneNumber}`;
  }
}

const registration = new UserRegistrationStateMachine("start");
formRegistration.addEventListener("submit", (e) => {
  e.preventDefault();
  message.textContent = registration.transition(userData.value.trim());
});
