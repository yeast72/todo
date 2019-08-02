import express, { Router, Request, Response, NextFunction } from "express";
import taskService from "../services/taskService";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.send(tasks);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const updateTask = req.body.task;
  const id = req.params.id;
  try {
    await taskService.updateTask(id, updateTask);
    res.status(200).json({ message: "Update Complte" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  try {
    const task = await taskService.createTask(title);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      await taskService.deleteTask(id);
      return res.status(200).json({ message: "Delete complete!" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
