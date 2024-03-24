class StateRegistration {
  constructor() {
    this.state = {};
  }

  addState(id) {
    this.state[id] = {
      firstName: "",
      lastName: "",
      phone: "",
      currentStep: "firstName", // Устанавливаем текущий шаг как firstName при создании состояния
    };
  }

  getAllState() {
    return this.state;
  }

  getIdState(id) {
    return this.state[id];
  }

  nextStep(id) {
    const userState = this.state[id];
    switch (userState.currentStep) {
      case "firstName":
        userState.currentStep = "lastName"; // Переходим к следующему шагу - lastName
        break;
      case "lastName":
        userState.currentStep = "phone"; // Переходим к следующему шагу - phone
        break;
      case "phone":
        userState.currentStep = "completed"; // Переходим к завершающему шагу
        break;
      case "completed":
        // Если пользователь достиг завершающего шага, то добавляем данные в базу данных
        const userData = {
          firstName: userState.firstName,
          lastName: userState.lastName,
          phone: userState.phone,
        };
        console.log(userData);
        break;
      default:
        // Если текущий шаг неизвестен, ничего не делаем
        break;
    }
  }
}

const registration = new StateRegistration();
const id = "1";
const id2 = "2";
registration.addState(id);
registration.addState(id2);

console.log(registration.getIdState(id)); // Выводим состояние пользователя с id "1"
registration.nextStep(id); // Переходим к следующему шагу для пользователя с id "1"
console.log(registration.getIdState(id)); // Выводим обновленное состояние пользователя с id "1"
