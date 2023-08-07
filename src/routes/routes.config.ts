// The express package is imported
import express from "express";

// We define this as an abstract class
// This contains the abstract method: config()
export abstract class RoutesConfig {
  // app is of the TypeScript type: Application, which is defined in @types/express
  app: express.Application;

  // name is the name of the route
  name: string;

  constructor(app: express.Application, name: string) {
    // Initializing the member variables
    this.app = app;
    this.name = name;
    this.config();
  }

  // Name Getter Method
  getName = () => {
    return this.name;
  };

  // config() is defined as an abstract function
  abstract config(): express.Application;
}
