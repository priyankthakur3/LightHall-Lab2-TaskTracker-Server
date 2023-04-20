import { Router } from "express";
import validations from "../validations.js";
import { userData } from "../data/index.js";
import jwt from "jsonwebtoken";

const router = Router();

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    "shhhhh11111",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
}

router.route("/login").post(async (req, res) => {
  let username, password;
  try {
    username = validations.checkMail(req.body.username);
    password = validations.checkString(req.body.password);
  } catch (error) {
    return req.status(400).json({ error });
  }
  if (!(await userData.checkIfUserExists(username)))
    return res
      .status(400)
      .json({ error: "Either Username or password is incorrect" });
  let dbUser;
  try {
    dbUser = await userData.checkUser(username, password);
    checkUserAndGenerateToken(dbUser, req, res);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

router.route("/register").post(async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    username = validations.checkString(username, "user_name");
    password = validations.checkString(password, "user_password");
  } catch (error) {
    return res.status(400).json({ error });
  }

  if (await userData.checkIfUserExists(username))
    return res.status(400).json({ error: "User already exists in system" });
  let userCreated;
  try {
    userCreated = await userData.createUser(username, password);
  } catch (error) {
    return res.status(500).json({ error });
  }
  if (userCreated) {
    return res.json({ status: "User Created" });
  }
});

export default router;
