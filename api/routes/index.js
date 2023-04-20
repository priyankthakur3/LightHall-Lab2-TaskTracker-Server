import loginRoutes from "./login.js";

const constructorMethod = (app) => {
  app.use("/", loginRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "route not found" });
  });
};

export default constructorMethod;
