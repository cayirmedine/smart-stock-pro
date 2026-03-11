import "dotenv/config";
import { z } from "zod";

const toNumber = (value: unknown) => {
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
};

const toBoolean = (value: unknown) => {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return value;
};

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_NAME: z.string().min(1).default("smart-stock-pro"),
  APP_PORT: z.preprocess(toNumber, z.number().int().positive()).default(3000),
  APP_HOST: z.string().min(1).default("0.0.0.0"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  TZ: z.string().min(1).default("Europe/Istanbul"),

  DB_HOST: z.string().min(1),
  DB_PORT: z.preprocess(toNumber, z.number().int().positive()),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_SCHEMA: z.string().min(1).default("public"),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),

  REDIS_HOST: z.string().min(1).optional(),
  REDIS_PORT: z.preprocess(toNumber, z.number().int().positive()).optional(),
  REDIS_PASSWORD: z.string().min(1).optional(),
  REDIS_URL: z.string().url().optional(),

  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1),
  JWT_REFRESH_EXPIRES_IN: z.string().min(1),
  BCRYPT_SALT_ROUNDS: z.preprocess(toNumber, z.number().int().min(8).max(15)),

  CORS_ORIGIN: z.string().min(1),
  CORS_CREDENTIALS: z.preprocess(toBoolean, z.boolean()).default(true),

  RATE_LIMIT_WINDOW_MS: z.preprocess(toNumber, z.number().int().positive()).optional(),
  RATE_LIMIT_MAX: z.preprocess(toNumber, z.number().int().positive()).optional(),

  PRISMA_LOG_QUERIES: z.preprocess(toBoolean, z.boolean()).default(false),
  PRISMA_LOG_WARNINGS: z.preprocess(toBoolean, z.boolean()).default(true),
  PRISMA_LOG_ERRORS: z.preprocess(toBoolean, z.boolean()).default(true),

  SENTRY_DSN: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid environment variables:\n${formatted}`);
}

export const env = parsed.data;
export type Env = typeof env;
