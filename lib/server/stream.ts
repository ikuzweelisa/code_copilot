
// const redis = Redis.fromEnv();
// const publisher: Publisher = {
//   connect: async () => {
//     return redis;
//   },
//   publish: async (channel, message) => {
//     await redis.publish(channel, message);
//   },
//   set: async (key, value, options) => {
//     await redis.set(key, value, { ex: options?.EX ?? 0 });
//   },
//   get: async (key) => {
//     const data = await redis.get<string | number | null>(key);
//     return data;
//   },
//   incr: async (key) => {
//     const data = await redis.incr(key);
//     return data;
//   },
// };

// const subscriber: Subscriber = {
//   connect: async () => {
//     return redis;
//   },
//   subscribe: async (channel, callback) => {
//     const sub = redis.subscribe(channel);
//     sub.on("message",(message)=>{
//       callback(message)
//     })
//   },
//   unsubscribe: async (channel) => {
//     await redis.un(channel);
//   },
// };
