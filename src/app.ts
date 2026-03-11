import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import Sentry from './lib/sentry.js';  // Use the exported Sentry instance
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: env.CORS_CREDENTIALS,
}));

app.get('/debug-error', (req, res) => {
  throw new Error("Sentry & Global Handler Test!");
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);

app.listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(`${env.APP_NAME} is running on http://${env.APP_HOST}:${env.APP_PORT} in ${env.NODE_ENV} mode`);
});

export default app;