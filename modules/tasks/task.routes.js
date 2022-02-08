const controllers = require('./tasks.controllers');
const express = require("express");


const ROUTES = {
  getTasks: "/tasks", // get - all tasks
  createTask: "/tasks", // post - create new task
  getTaskById: "/tasks/:taskId", //get - get details for one task
  updateTask: "/tasks/:taskId", //put  - update by id
  deleteTask: "/tasks/:taskId", //delete - delete one task by id
};

function taskRouter(app) {
  const router = express.Router();

  router
    .get(ROUTES.getTasks, controllers.getTasks)
    .get(ROUTES.getTaskById, controllers.getTaskById)
    .post(ROUTES.createTask, controllers.createTask)
    .put(ROUTES.updateTask, controllers.updateTask)
    .delete(ROUTES.deleteTask, controllers.deleteTask);

  app.use("/api", router);
}

module.exports = taskRouter;

