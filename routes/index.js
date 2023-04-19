import loginRoutes from "./login.js";

const constructorMethod = (app) => {
  app.use("/login", loginRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "route not found" });
  });
};

export default constructorMethod;
