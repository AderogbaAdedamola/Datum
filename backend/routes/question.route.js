import express from "express";
import { createQuestion, getQuestion, updateQuestion, deleteQuestion } from "../controllers/question.controller";

const questionRouter = express.Router();

questionRouter.post("/create", createQuestion);
questionRouter.get("/get/:questionId", getQuestion);
questionRouter.patch("/:questionId", updateQuestion);
questionRouter.delete("/:questionId", deleteQuestion);

export default questionRouter;