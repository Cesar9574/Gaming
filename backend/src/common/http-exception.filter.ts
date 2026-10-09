import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Deja TODOS los errores con la misma forma:
 * { statusCode, error, message: string[], path, timestamp }
 * (Nest por defecto a veces manda message como string y a veces como arreglo.)
 * Los errores que no son HttpException (bugs reales) salen como 500 genérico,
 * sin exponer detalles internos. No se provoca ninguno a propósito.
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string[] = ['Error interno del servidor'];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = [body];
        error = exception.name;
      } else {
        const b = body as { message?: string | string[]; error?: string };
        message = Array.isArray(b.message) ? b.message : [b.message ?? exception.message];
        error = b.error ?? exception.name;
      }
    }

    res.status(statusCode).json({
      statusCode,
      error,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
