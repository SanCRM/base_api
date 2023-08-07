import { Response } from "express";

import { IBaseController } from "../interfaces/IBaseController";

export class BaseController implements IBaseController {
  public jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }
  static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public success<T>(res: Response, dto?: T) {
    if (dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.status(200).send();
    }
  }

  public created(res: Response, id?: number | null, json?: Object) {
    if (json) return res.status(201).json(json);
    if (id) return res.status(201).json({ id: id });
    return res.status(201).send();
  }

  public noContent(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      202,
      message ? message : "Unauthorized"
    );
  }

  public badRequest(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Unauthorized"
    );
  }

  public unauthorized(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public paymentRequired(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment required"
    );
  }

  public forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public error(res: Response, error: Error | string) {
    console.log(error);
    return res.status(400).json({
      message: error.toString(),
    });
  }

  public fail(res: Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
