class ChatError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "ChatError";
    this.code = code;
  }
}

export { ChatError };
