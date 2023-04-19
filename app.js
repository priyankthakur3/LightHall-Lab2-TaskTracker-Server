import express from "express";
import configRoutes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 9001;
app.use(express.json());
configRoutes(app);
app.listen(port, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on http://localhost:${port}`);
});
