import express from "express";
import {
    createSurvey,
    getSurvey,
    getProjectSurveys,
    updateSurvey,
    deleteSurvey,
    addQuestionToSurvey,
    removeQuestion
} from "../controllers/survey.contoller.js";

const surveyRouter = express.Router();

surveyRouter.post("/create", createSurvey);
surveyRouter.get("/:surveyId", getSurvey);
surveyRouter.get("/project/:projectId", getProjectSurveys);
surveyRouter.patch("/:surveyId", updateSurvey);
surveyRouter.delete("/:surveyId", deleteSurvey);
surveyRouter.post("/:surveyId/questions", addQuestionToSurvey);
surveyRouter.delete("/:surveyId/questions/:questionId", removeQuestion);

export default surveyRouter