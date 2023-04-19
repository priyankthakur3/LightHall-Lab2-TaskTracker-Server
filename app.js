import express from "express";

const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on http://localhost:${port}`);
});
