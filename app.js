const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs")
const ejs = require("ejs");
const mongoose = require("mongoose")

const app = express();
const dbName = "taskDB"

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://pritamdas19:Test123@cluster0.kr7drhn.mongodb.net/?retryWrites=true&w=majority")
const taskSchema = new mongoose.Schema({ taskItem: {
    type: String,required:[true, "taskItem is empty"]} 
})

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    Task.find({})
        .then(function (foundItems) {
            res.render("index", {
                taskList: foundItems
            })
        })
        .catch(function (err) {
            console.log(err);
        })
})

const Task = mongoose.model("Task", taskSchema)

app.post("/", function (req, res) {
    const tasks = new Task({ taskItem: req.body.taskName })
    if (req.body.taskName = "") {
        alert("Please enter any task item to the list")
    } else {
        Task.insertMany([tasks])
            .then(function () {
                console.log("Your data has been successfully saved");
            })
            .catch(function (err) {
                console.log(err + ", saving error");
            })
    }
    res.redirect("/")
})

app.post("/delete", function (req, res) {
    Task.findOneAndDelete({_id: req.body.crossBtn})
    .then(function () {
        console.log("All okay"+req.body.crossBtn+"data deleted");
    })
    .catch(function (err) {
        console.log(err+"Deleting error");
    })

    res.redirect("/")
})

app.listen(PORT, function () {
    console.log("Server has started on port" + PORT);
})