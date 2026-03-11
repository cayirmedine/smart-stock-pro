import type { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";
import { env } from '../config/env';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (err as any).statusCode || 500;

    if (statusCode === 500) {
        Sentry.captureException(err);
    }

    console.error(`[Error] ${req.method} ${req.path} >>`, err.message);

    res.status(statusCode).json({
        status: "error",
        message: statusCode === 500 && env.NODE_ENV === "production" ? 
        "Internal Server Error" : 
        err.message,
        ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
};