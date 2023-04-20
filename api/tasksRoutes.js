const express = require("express");
const taskData = require("./tasksData");
const { checkString, checkTaskStatus } = require("./validations");
const router = express.Router();

router.post("/create", async (req, res) => {
  let taskTitle, taskDesc, taskStatus, taskDue;
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ errorMessage: "User unauthorized!", status: false });
  }
  try {
    taskTitle = checkString(req.body.taskTitle, "Task Title");
    taskDesc = checkString(req.body.taskDesc, "Task Description");
    taskStatus = checkTaskStatus(req.body.taskStatus);
    taskDue = checkString(req.body.taskDue, "Task Due");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }

  let newTaskObj;
  try {
    newTaskObj = await taskData.createTask(
      req.user.id,
      taskTitle,
      taskDesc,
      taskStatus,
      taskDue
    );
    console.log(newTaskObj);
    if (!newTaskObj)
      return res
        .status(500)
        .json({ errorMessage: "Something went wrong!", status: false });
    else {
      return res.json({ taskCreated: true, taskData: newTaskObj });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/allTasks", async (req, res) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ errorMessage: "User unauthorized!", status: false });
  }
  try {
    let allUserTask = await taskData.getAllTaskUser(req.user.id);
    return res.json({
      tasksCount: allUserTask.length,
      status: true,
      taskData: allUserTask,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
