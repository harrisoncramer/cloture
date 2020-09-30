import util from "util";
import redis from "redis";

export const configureRedis = async () => {
  // Initial connection
  const client = redis.createClient({
    port: parseInt(process.env.REDIS_PORT as string),
    host: process.env.REDIS_URL,
    auth_pass: process.env.REDIS_PASSWORD,
  });

  // Configure promisify-ed methods
  //const hset = util.promisify(client.hset).bind(client);
  //const hget = util.promisify(client.hget).bind(client);
  const flusher = util.promisify(client.flushdb).bind(client);

  try {
    await flusher();
  } catch (err) {
    console.error("Could not flush Redis cache.");
    throw err;
  }
};
