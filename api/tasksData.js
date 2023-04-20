const { users } = require("./mongoCollections");
const { ObjectId } = require("mongodb");

const validations = require("./validations");

const exportedMethods = {
  async createTask(userID, taskTitle, taskDesc, taskStatus, taskDue) {
    userID = validations.checkId(userID);
    taskTitle = validations.checkString(taskTitle, "Task Title");
    taskDesc = validations.checkString(taskDesc, "Task Description");
    taskStatus = validations.checkTaskStatus(taskStatus);
    taskDue = taskDue;

    const usersCollection = await users();
    let dbUser = await usersCollection.findOne(
      { _id: new ObjectId(userID) },
      { projection: { _id: 1 } }
    );
    if (!dbUser) throw new Error(`User Doesnot exists for ID: ${userID}`);
    let taskID = new ObjectId();
    let newTaskCreated = await usersCollection.findOneAndUpdate(
      {
        _id: dbUser._id,
      },
      {
        $addToSet: {
          tasks: {
            _id: taskID,
            taskTitle,
            taskDesc,
            taskStatus,
            taskDue,
          },
        },
      },
      { returnDocument: "after" }
    );

    if (newTaskCreated.lastErrorObject.n === 0)
      throw new Error("Failed to Add Task");

    newTaskCreated = newTaskCreated.value.tasks;
    newTaskCreated = newTaskCreated.filter((task) => {
      return task._id.toString() === taskID.toString(taskID);
    });
    return newTaskCreated;
  },
  async getAllTaskUser(userID) {
    userID = validations.checkId(userID);
    const usersCollection = await users();
    let dbUser = await usersCollection.findOne(
      { _id: new ObjectId(userID) },
      { projection: { _id: 1, tasks: 1 } }
    );
    if (!dbUser) throw new Error(`User Doesnot exists for ID: ${userID}`);
    let allTasks = dbUser.tasks;
    allTasks.map((task) => (task._id = task._id.toString()));
    return allTasks;
  },

  async removeTask(taskID) {
    taskID = validations.checkId(taskID);
    const usersCollection = await users();
    let dbUser = await usersCollection.findOne(
      { "tasks._id": new ObjectId(taskID) },
      { projection: { _id: 1 } }
    );
    if (!dbUser) throw new Error(`No Task Exists for ID ${taskID}`);
    const dbUserInfo = await usersCollection.updateOne(
      { _id: dbUser._id },
      {
        $pull: { tasks: { _id: new ObjectId(taskID) } },
      }
    );

    if (!dbUserInfo.acknowledged || dbUserInfo.modifiedCount !== 1)
      throw new Error("Failed to Remove Tasks");

    return { taskID, deleted: true };
  },
};

module.exports = exportedMethods;
