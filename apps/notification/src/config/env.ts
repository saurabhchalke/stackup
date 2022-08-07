import dotenv from "dotenv";

dotenv.config();

interface AppEnvironment {
  NODE_ENV: "production" | "development";
  NAME: string;
  PORT: number;
  MONGO_URL: string;
  SENTRY_DSN: string;
  FIREBASE_SERVICE_ACCOUNT: object;
}

export const Env: AppEnvironment = {
  NODE_ENV:
    process.env.NODE_ENV === "production" ? "production" : "development",
  NAME: "Notification",
  PORT: Number(process.env.STACKUP_NOTIFICATION_PORT),
  MONGO_URL: process.env.STACKUP_NOTIFICATION_MONGODB_URL ?? "",
  SENTRY_DSN: process.env.STACKUP_NOTIFICATION_SENTRY_DSN ?? "",
  FIREBASE_SERVICE_ACCOUNT: JSON.parse(
    process.env.STACKUP_NOTIFICATION_FIREBASE_SERVICE_ACCOUNT ?? "{}"
  ),
};
