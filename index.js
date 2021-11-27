const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const user = require("./routes/user");
const tasks = require("./routes/tasks");
const path =  require("path");

app.use(express.json());
app.use(cors());
app.use("/user",user);
app.use("/tasks",tasks);


app.use(express.static(path.join(__dirname, "client/build/")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client/build/index.html"));
});

app.listen(port,()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected");
    })
});