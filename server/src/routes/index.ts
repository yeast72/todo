import express, { Router, Request, Response, NextFunction } from "express";
import task from "./tasks";

const routes: Router = express.Router();

routes.use("/tasks", task);

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Conntected!" });
});

routes.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Route" + req.url + " Not found." });
});

routes.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ message: message });
});

export default routes;
