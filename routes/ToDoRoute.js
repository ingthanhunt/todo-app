const { Router } = require("express");

const router = Router();

const {getToDo, saveToDo, deleteToDo, updateToDo, updateToDoStatus, getToDoOnlyNotDone} = require("../controllers/ToDoController");

router.get("/get-todo", getToDo);
router.get("/get-todo-not-done", getToDoOnlyNotDone);
router.post("/save-todo", saveToDo);
router.post("/delete-todo", deleteToDo);
router.post("/update-todo", updateToDo);
router.post("/update-todo-status", updateToDoStatus);

module.exports = router;