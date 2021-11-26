const express = require("express");
const taskRoutes = express.Router();
const userModel = require("../models/User");
const taskModel = require("../models/Task");
const authorize = require("../middlewares/authorize");

taskRoutes.get("/get-all/", authorize, async (req, res, next) => {
  try {
    const email = req.user;
    const existingUser = await userModel.findOne({ email });
    const { tasks } = existingUser;
    const completeTasks = [];
    for (i = 0; i < tasks.length; i++) {
      const presentTask = await taskModel.findOne({ _id: tasks[i] });
      completeTasks.push(presentTask);
    }
    return res.json({ completeTasks });
  } catch (error) {
    return res.json({ error });
  }
});

taskRoutes.post("/add-task", authorize, async (req, res, next) => {
  try {
    const { name, description, bucketName, deadline, isCompleted, priority } =
      req.body;
    const email = req.user;
    const existingUser = await userModel.findOne({ email });
    if (name && description && deadline && priority) {
      const tasks = [...existingUser.tasks];
      const newTask = new taskModel({
        name,
        description,
        bucketName,
        deadline,
        isCompleted,
        priority,
      });
      tasks.push(newTask);
      newTask
        .save()
        .then(() => {
          userModel
            .updateOne({ email }, { $set: { tasks } })
            .then((addedTask) => {
              return res.json({ addedTask });
            });
        })
        .catch((err) => {
          res.json({ err });
        });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

taskRoutes.delete("/delete-task/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const email = req.user;
    if (id) {
      const deletedTask = await taskModel.findOne({ _id: id });
      const existingUser = await userModel.findOne({ email });
      let existingTasks = [...existingUser.tasks].map(task=>task.toString());
      existingTasks = existingTasks.filter(task=>task!==id);
      taskModel.deleteOne({_id:id}).then(async()=>{
        await userModel.updateOne({email},{$set:{tasks:existingTasks}});
        return res.json({deletedTask});
      }).catch((err)=>{
        res.json(err.message);
      });
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

taskRoutes.patch("/update-task/:id", authorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, bucketName, deadline, isCompleted, priority } =
      req.body;
    if (id) {
      const updatedTask = await taskModel.findOneAndUpdate({ _id: id },{ description, bucketName, deadline, isCompleted, priority },{
        new:true,
      });
      return res.json({updatedTask});
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = taskRoutes;
