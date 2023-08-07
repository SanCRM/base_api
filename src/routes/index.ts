import express from "express";
import cors from "cors";
import { RoutesConfig } from "./routes.config";
import { TestRoutes } from "./testRoute";

const app: express.Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const routes: Array<RoutesConfig> = [];
routes.push(new TestRoutes(app));

export default app;
