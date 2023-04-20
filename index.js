const express = require("express");
const app = express();
const cors = require("cors");
const loginroutes = require("./api/loginroutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", loginroutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
