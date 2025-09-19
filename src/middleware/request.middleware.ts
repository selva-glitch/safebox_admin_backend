// src/middleware/request-context.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body, query, params } = req;
    // Attach a custom object to the request
    req['context'] = {
      timestamp: new Date().toISOString(),
      body,
      query,
      params,
      headers: req.headers,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    };

    next();
  }
}
