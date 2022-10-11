const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: String,
  isDone: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Task;
