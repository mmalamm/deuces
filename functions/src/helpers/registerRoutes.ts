import { Application } from "express";
const registerRoutes = (app: Application, routes: {}): Application => {
  for (const route in routes) {
    app.post("/" + route, routes[route]);
  }
  return app;
};

export default registerRoutes;
