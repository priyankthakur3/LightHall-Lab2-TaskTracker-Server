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

  checkDate(varVal, varName) {
    if (typeof varName !== "string" || varName.trim().length < 1)
      throw new Error(`Expected VarName to be non-empty String`);

    if (typeof varVal !== "string" || varVal.trim().length < 1)
      throw new Error(`Expected ${varName} to be non-empty String`);
    varVal = varVal.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(varVal))
      throw new Error(`Expected ${varName} to be of format 'YYYY-MM-DD'`);

    let currentDate = new Date();
    currentDate =
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000;
    console.log(currentDate);

    let inputDate = new Date(varVal);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate <= currentDate)
      throw new Error(`Expected ${varName} to not less than current date`);

    return varVal;
    // let dateSplit = varVal.match(regexDate);
    // let month = parseInt(dateSplit[1] - 1);
    // let day = parseInt(dateSplit[2]);
    // let year = parseInt(dateSplit[3]);
    // let dateObj = new Date(year, month, day);

    // if (
    //   dateObj.getFullYear() !== year ||
    //   (dateObj.getMonth() !== month && dateObj.getDate() !== day)
    // )
    //   throw new Error(`Invalid date in ${varName}`);
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

  isStringName(varName, varVal) {
    /**
     * Function to check if string is string or not
     * Input Variable Name, Variable Value in String
     * Return type: trim varVal in String
     */
    let regex = /^[a-zA-Z]{2,25}$/;
    if (typeof varName !== "string" || varName.trim().length < 1)
      throw new Error(`Expected VarName to be non-empty String`);

    if (typeof varVal !== "string" || varVal.trim().length < 1)
      throw new Error(`Expected ${varName} to be non-empty String`);
    varName = varName.trim();
    if (!regex.test(varVal))
      throw new Error(
        `Expected ${varName} to contain characters of length between 2-25`
      );

    return varVal.trim();
  },
  checkTaskStatus(taskStatus) {
    if (
      !taskStatus ||
      typeof taskStatus !== "string" ||
      taskStatus.trim().length === 0
    )
      throw new Error("Error: Expecteed Task Value");
    taskStatus = taskStatus.trim().toLowerCase();
    const taskList = ["todo", "progress", "waitlist", "completed"];
    if (!taskList.includes(taskStatus))
      throw new Error(
        `Expected: Task Status to be either of ${taskList.join(",")}`
      );
    return taskStatus;
  },
};

module.exports = exportedMethods;
