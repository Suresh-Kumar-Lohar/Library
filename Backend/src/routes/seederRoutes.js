import express from "express";
import SeederController from "../controllers/seederController.js";
const router = express.Router();

router.get("/add-books", SeederController.addBooks)

export default router;