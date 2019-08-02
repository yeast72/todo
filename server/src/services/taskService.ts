import Task from "../models/task";

const createTask = async (title: string) => {
  const task = new Task({ title });
  await task.save();
  return task;
};

const getTaskById = async (id: string) => {
  const task = await Task.findById(id);
  return task;
};

const getAllTasks = async () => {
  const tasks = await Task.find();
  return tasks;
};

const deleteTask = async (id: string) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new Error("Could not found task");
  }
  await Task.findByIdAndDelete(id);
};

const updateTask = async (id: string, newTask: object) => {
  const task = await Task.findById(id);
  if (task) {
    return await task.updateOne({ ...newTask });
  }
  throw new Error("Could not find task");
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
