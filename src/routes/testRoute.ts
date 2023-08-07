import express from "express";

import { RoutesConfig } from "./routes.config";

import { BaseController } from "../controllers/BaseController";
import { TestController } from "../controllers/TestController";

export class TestRoutes extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, "TestRoutes");
  }
  config() {
    this.app.route("/test").get(new TestController(new BaseController()).test);

    return this.app;
  }
}
