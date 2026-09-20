import express from "express";

import {
    createProject,
    getMyProjects,
    getProject,
    updateProject,
    deleteProject 
} from "../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.post("/create", createProject);
projectRouter.get("/get", getMyProjects);
projectRouter.get("/:projectId", getProject);
projectRouter.patch("/:projectId", updateProject);
projectRouter.delete("/:projectId", deleteProject);

export default projectRouter;