import express from "express";
import UserController from "../controllers/userController.js";
import { authMiddleware } from "../helper/auth.js";
const router = express.Router();

router.post("/sign-up", UserController.signUp);

router.post("/login", UserController.userLogin);

router.get("/get-profile", authMiddleware, UserController.getUserProfile);

export default router;