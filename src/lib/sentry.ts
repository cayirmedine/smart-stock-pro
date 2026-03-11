import * as Sentry from "@sentry/node";
import { env } from '../config/env.js';

Sentry.init({
  dsn: env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

export default Sentry;