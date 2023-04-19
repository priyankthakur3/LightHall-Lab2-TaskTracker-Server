import { Router } from "express";

const router = Router();

router.route("/").get(async (req, res) => {
  res.json({ success: "My First Route" });
});

export default router;
