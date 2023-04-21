const { ObjectId } = require("mongodb");
const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide an ${varName} id to search for`;
    if (typeof id !== "string") throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} is invalid object ID`;
    return id;
  },
  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    return strVal;
  },
  checkMail(emailid) {
    if (!emailid) throw new Error(`Expected Emailid to be non-empty`);
    if (typeof emailid !== "string" || emailid.trim().length === 0)
      throw new Error(`Expected Emailid to be non-empty string`);
    emailid = emailid.trim().toLowerCase();
    let regex = /^[\w._%+-]+(@[a-z]+\.com)$/;
    if (!regex.test(emailid))
      throw new Error(`Expected email id to be of Stevens`);
    return emailid;
  },
  checkTaskStatus(taskStatus) {
    if (
      !taskStatus ||
      typeof taskStatus !== "string" ||
      taskStatus.trim().length === 0
    )
      throw new Error("Error: Expecteed Task Value");
    taskStatus = taskStatus.trim().toLowerCase();
    const taskList = ["todo", "progress", "waitlist", "done"];
    if (!taskList.includes(taskStatus))
      throw new Error(
        `Expected: Task Status to be either of ${taskList.join(",")}`
      );
    return taskStatus;
  },
};

module.exports = exportedMethods;
