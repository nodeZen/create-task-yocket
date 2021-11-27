const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/user");
const tasks = require("./routes/tasks");

app.use(express.json());
app.use(cors());
app.use("/user",user);
app.use("/tasks",tasks);
app.listen(port,()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected");
    })
})