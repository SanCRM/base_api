import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { createServer, Server } from "http";

import app from "./routes/index";

const server: Server = createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running locally at port: ${PORT}`);
});
