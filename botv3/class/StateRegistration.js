class StateRegistration {
  constructor({ bot }) {
    this.state = {};
    this.bot = bot;
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

  nextStep(id,text) {
    const userState = this.state[id];
    switch (userState.currentStep) {
      case "firstName":
        userState[userState.currentStep] = text;
        userState.currentStep = "lastName"; // Переходим к следующему шагу - lastName
        this.bot.basicMethods.sendMessage(id, "Введите вашу фамилию:"); // Отправляем сообщение через бота
        break;
      case "lastName":
        userState[userState.currentStep] = text;
        userState.currentStep = "phone"; // Переходим к следующему шагу - phone
        this.bot.basicMethods.sendMessage(id, "Введите ваш номер телефона:"); // Отправляем сообщение через бота
        break;
      case "phone":
        userState[userState.currentStep] = text;
        userState.currentStep = "completed"; // Переходим к завершающему шагу
        this.bot.basicMethods.sendMessage(
          id,
          "Регистрация завершена, спасибо!"
        ); // Отправляем сообщение через бота
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
module.exports = StateRegistration;
