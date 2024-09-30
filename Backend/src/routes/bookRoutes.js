import express from "express";
import BookController from "../controllers/bookController.js";
const router = express.Router();

router.post("/list", BookController.listAllBooks)

export default router;