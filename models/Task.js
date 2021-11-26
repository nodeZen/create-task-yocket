const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  bucketName: {
    type: String,
  },
  deadline: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: String,
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
