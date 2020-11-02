import util from "util";
import redis from "redis";

export const configureRedis = async (): Promise<void> => {
  // Initial connection
  const client = redis.createClient({
    port: parseInt(process.env.REDIS_PORT as string),
    host: process.env.REDIS_URL,
    auth_pass: process.env.REDIS_PASSWORD,
  });

  const flusher = util.promisify(client.flushdb.bind(client));

  try {
    // Flush DB of old jobs on startup.
    await flusher();
    console.log(`📊 Redis connected and flushed.`);
  } catch (err) {
    console.error("❌ Could not flush Redis cache.");
    process.exit();
  }
};
