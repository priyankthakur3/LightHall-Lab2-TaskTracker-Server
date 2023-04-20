import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import validations from "../validations.js";

const passwordEncryptRounds = 10;

const exportedMethods = {
  async createUser(username, password) {
    let usersCollection = await users();
    username = validations.checkString(username, "User Name");
    password = validations.checkString(password, "Password");
    let hashpassword = await bcrypt.hash(password, passwordEncryptRounds);

    let newUser = {
      username,
      password: hashpassword,
      tasks: [],
    };
    let userInsertedInfo = await usersCollection.insertOne(newUser);
    if (!userInsertedInfo.acknowledged || !userInsertedInfo.insertedId)
      throw new Error(`Could not Create User`);

    return {
      usercreated: true,
    };
  },

  async checkUser(username, password) {
    username = validations.checkMail(username);
    password = validations.checkString(password);
    let usersCollection = await users();
    let dbUser = await usersCollection.findOne(
      { username },
      { projection: { _id: 1, username: 1, password: 1 } }
    );
    if (!dbUser) throw new Error(`Either email or password is invalid`);

    if (!(await bcrypt.compare(password, dbUser.password)))
      throw new Error(`Either email or password is invalid`);
    return {
      _id: dbUser._id.toString(),
      username: dbUser.username,
    };
  },
  async checkIfUserExists(username) {
    username = validations.checkString(username, "User Name");
    let usersCollection = await users();
    let dbUser = await usersCollection.findOne(
      { username },
      { projection: { _id: 1, username: 1 } }
    );
    if (dbUser) return true;
    return false;
  },
};

export default exportedMethods;
