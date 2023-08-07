import { Request, Response } from "express";
import { IBaseController } from "../interfaces/IBaseController";

export class TestController {
  BaseController: IBaseController;

  constructor(BaseController: IBaseController) {
    this.BaseController = BaseController;
  }

  public async test(req: Request, res: Response) {
    return res.status(200).json({
      STATUS: "Running",
      TIP: "Code your controller here!",
    });
  }
}
