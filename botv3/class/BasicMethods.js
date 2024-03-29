class BasicMethods {
  constructor({ apiService }) {
    this.apiService = apiService;
    this.commandHandlers = {};
    this.callbackHandlers = {};
  }

  action(text, handler) {
    this.callbackHandlers[text] = this.wrapperHandler(handler);
  }
  // Hears for command wtih "/"
  hears(command, handler) {
    this.commandHandlers[command] = this.wrapperHandler(handler);
  }

  // add comfortable logics for answer for question
  wrapperHandler = (handler) => async (message) => {
    const context = {
      message,
      reply: async (text, params = {}) => {
        await this.sendMessage(message.chat.id, text, params);
      },
    };
    await handler(context);
  };
  // END BUTTON LOGICS

  // TELEGRAM methods
  // setMyCommands
  async setMyCommands(commands = [{ command, description }]) {
    const commandsArray = {
      commands,
    };
    await this.apiService.post("setMyCommands", commandsArray);
  }
  // sendMessage
  async sendMessage(chat_id, text, params = {}) {
    // console.log(params);
    try {
      const response = await this.apiService.post("sendMessage", {
        chat_id,
        text,
        ...params,
      });
      // console.log("Message sent:", response.data.result);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
}

module.exports = BasicMethods;
