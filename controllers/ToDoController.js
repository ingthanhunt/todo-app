const ToDoModel = require("../models/ToDoModal");

const getToDo = async (req, res) => {
    const todo = await ToDoModel.find().sort({isDone: 1}).sort({date: 1});
    res.send(todo);
}

const getToDoOnlyNotDone = async (req, res) => {
    const todo = await ToDoModel.find({isDone: {$eq: 0}}).sort({date: 1});
    res.send(todo);
}

const saveToDo = async (req, res) => {
    const { text, date, isDone } = req.body;
    
    ToDoModel
        .create({ text, date , isDone })
        .then(() => res.set(201).send("Add successfully..."))
        .catch((err) => console.log(err)) 
}

const deleteToDo = (req, res) => {
    const { _id } = req.body;

    ToDoModel
        .findByIdAndDelete( _id )
        .then(() => res.set(201).send("Delete successfully..."))
        .catch((err) => console.log(err))
}

const updateToDo = (req, res) => {
    const { _id, text, date, isDone} = req.body;

    ToDoModel
        .findByIdAndUpdate(_id, {text, date, isDone})
        .then(() => res.set(201).send("Update successfully..."))
        .catch((err) => console.log(err))
}

const updateToDoStatus = (req, res) => {
    const { _id, isDone } = req.body;

    ToDoModel
        .findByIdAndUpdate( _id, {isDone} )
        .then(() => res.set(201).send("Update Status successfully..."))
        .catch((err) => console.log(err))
}

module.exports = {getToDo, getToDoOnlyNotDone, saveToDo, deleteToDo, updateToDo, updateToDoStatus}