const mongoose = require("mongoose");
const Task = require("./task.model");
const User = require("../auth/user.model.js");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get all tasks -> get - /tasks
// Get the tasks only for the userId session
async function getTasks(req, res) {
  try {
    const userId = req.session?.user?._id;
    console.log(req.session.user);
    //user: { email: 'k300@mail.com', _id: '62005ce44d0e0fd37c6e7711' }

    const tasks = await Task.find({ owner: userId }).lean(); //find all
    console.log(tasks);
    res.status(200).json(tasks).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// Get one task by id ->  -> get - /tasks/taskId
async function getTaskById(req, res) {
  try {
    const { taskId } = req.params; // take from params
    console.log(taskId);
    if (!isObjectId(taskId)) {
      res.status(400).json("Id not valid").end();
    }
    const task = await Task.findById(taskId).lean();
    //const task = await Task.findById(taskId).populate("tasks").lean();
    console.log(task);
    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}
// createTask - post -  "/tasks"
async function createTask(req, res) {
  try {
    //const {title, description, projectId} = req.body;
    const userId = req.session?.user?._id;
    const task = await Task.create({ ...req.body, owner: userId });
    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

//updateTask - put -  "/tasks/:taskId",
async function updateTask(req, res) {
  try {
    const { taskId } = req.params; // params
    if (!isObjectId(taskId)) {
      res.status(400).json("Id not valid").end();
    }
    const task = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    }).lean();
    console.log(task);

    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

//Delete task - delete -  "/tasks/:taskId",
async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;
    if (!isObjectId(taskId)) {
      res.status(400).json("Id not valid").end();
    }
    const task = await Task.findByIdAndDelete(taskId).lean();
    console.log(task);
    res.status(200).json(task).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
