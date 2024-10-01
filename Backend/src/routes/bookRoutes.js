import express from "express";
import { authMiddleware } from "../helper/auth.js";
import BookController from "../controllers/bookController.js";
const router = express.Router();

router.post("/list", authMiddleware, BookController.listAllBooks);

router.post("/borrow", authMiddleware, BookController.borrowBooks);

router.get("/user-borrow-list", authMiddleware, BookController.userBorrowList);

router.post("/submit", authMiddleware, BookController.returnBooks);

export default router;