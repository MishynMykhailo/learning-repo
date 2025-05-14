class BasicMethods {
  constructor({ apiService }) {
    this.apiService = apiService;
    this.commandHandlers = {};
    this.callbackHandlers = {};
  }
  // sendMessage
  async sendMessage({ chat_id, text, params = {} }) {
    console.log(params);
    try {
      const response = await this.apiService.post("sendMessage", {
        chat_id,
        text,
        ...params,
      });
      console.log("Message sent:", response.data.result);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }
}

module.exports = BasicMethods;
