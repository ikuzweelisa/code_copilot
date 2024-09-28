import { PrismaClient } from "@prisma/client";

const PrismaSingleton = () => {
  return new PrismaClient();
};
declare global {
  var prisma: undefined | ReturnType<typeof PrismaSingleton>;
}
const prisma = globalThis.prisma ?? PrismaSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;