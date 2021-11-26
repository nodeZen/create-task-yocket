const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors");

const user = require("./routes/user");
const tasks = require("./routes/tasks");

app.use(express.json());
app.use(cors());
app.use("/user",user);
app.use("/tasks",tasks);
app.listen(port,()=>{
    mongoose.connect('mongodb://localhost:27017/createtask').then(()=>{
        console.log("Connected");
    });
})