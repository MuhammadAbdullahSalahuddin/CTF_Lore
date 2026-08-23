import Redis from "ioredis";

export const redis = new Redis({
  host: process.env.LORE_REDIS_HOST || "localhost",
  port: Number(process.env.LORE_REDIS_PORT) || 6379,
  password: process.env.LORE_REDIS_PASS || undefined,
});
