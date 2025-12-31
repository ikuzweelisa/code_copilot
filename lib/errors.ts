class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatError";
    this.message = message;
  }
}

export { ChatError };
