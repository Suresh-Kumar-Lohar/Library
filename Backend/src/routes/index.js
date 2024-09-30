import express from "express";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";
import seederRoutes from "./seederRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.handler.success("Welcome to Library!")
})

router.use("/user", userRoutes);

router.use("/book", bookRoutes);

router.use("/seeder", seederRoutes);

export default router;