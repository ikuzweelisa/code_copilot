import { createIdGenerator } from "ai";
import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
export const idGenerator = createIdGenerator({
  prefix: "msg_",
  size: 14,
  alphabet: alphabet,
});

export function generateMessageId() {
  return idGenerator();
}

export const generateChatId = () => {
  return customAlphabet(alphabet, 7)();
};
