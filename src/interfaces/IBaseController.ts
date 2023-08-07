import { Response } from "express";

export interface IBaseController {
  jsonResponse(
    res: Response,
    code: number,
    message: string
  ): Response<any, Record<string, any>>;
  success<T>(res: Response, dto?: T): Response<any, Record<string, any>>;
  created(
    res: Response,
    id?: number | null,
    json?: Object
  ): Response<any, Record<string, any>>;

  noContent(
    res: Response,
    message?: string
  ): Response<any, Record<string, any>>;
  badRequest(
    res: Response,
    message?: string
  ): Response<any, Record<string, any>>;

  unauthorized(
    res: Response,
    message?: string
  ): Response<any, Record<string, any>>;

  paymentRequired(
    res: Response,
    message?: string
  ): Response<any, Record<string, any>>;

  forbidden(
    res: Response,
    message?: string
  ): Response<any, Record<string, any>>;

  notFound(res: Response, message?: string): Response<any, Record<string, any>>;

  error(
    res: Response,
    error: Error | string
  ): Response<any, Record<string, any>>;

  fail(
    res: Response,
    error: Error | string
  ): Response<any, Record<string, any>>;
}
