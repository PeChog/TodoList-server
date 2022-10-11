const express = require("express");

const router = express.Router();

const Task = require("../models/Task");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/tasks", isAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    const tasks = await Task.find({ user: user._id });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/create/Task", isAuthenticated, async (req, res) => {
  console.log(req.fields);

  try {
    // if (req.fields.title.length >= 50) {
    //   res.status(400).json({ message: "Tasks are limited to 50 characters" });
    // } else {
    const user = req.user;
    const newTask = new Task({
      title: req.fields.title,
      isDone: req.fields.isDone,
      user: user._id,
      //   });
    });

    await newTask.save();
    console.log(newTask);

    res.json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/delete/Task", isAuthenticated, async (req, res) => {
  try {
    const { taskId } = req.query;
    const user = req.user;
    const taskToDelete = await Task.findById(taskId);
    if (taskToDelete.user.toString() === user._id.toString()) {
      await Task.findByIdAndDelete(taskId);
      res.json({ message: "Task deleted" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
