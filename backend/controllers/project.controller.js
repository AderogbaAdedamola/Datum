import Project from "../model/project.model.js";
import Survey from "../model/survey.model.js";

const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        const researcherId = req.user._id;

        if (!title){
            return res.status(400).json({
                success: false,
                message: "Project title is required"
            })
        }

        const project = await Project.create({
            researcherId,
            title,
            description,
            status: "draft"
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });
    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create project"
        });
    }
}

const getMyProjects = async (req, res) => {
    try {
        const researcherId = req.user._id;

        const projects = await Project.find({researcherId}).sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            count: projects.length,
            projects
        });
    } catch (error) {
        console.error("Get projects error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve projects"
        });
    }
}

const getProject = async (req, res) => {   //for single projects
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId).populate("researcherId");

        if (!project){
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            project
        });
    } catch (error) {
        console.error("Get project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve project"
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const {
            title,
            description,
            status
        } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                meessage: "Project not found"
            });
        }

        if (
            project.researcherId.toString() !==
            req.user._id.toString()
        ){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this project"
            });
        }

        if  (title !== undefined){
            project.title = title;
        }

        if (description !== undefined){
            project.description = description;
        }

        if (status !== undefined){
            project.status = status;
        }

        await project.save();

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project
        });
    } catch (error){
        console.error("Update project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update project"
        });
    }
};


const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        if (
            project.researcherId.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this project",
            });
        }

        //just realized I need to delete all other dependencies also
        await Survey.deleteMany({
            projectId: project._id
        });

        await Project.findByIdAndDelete(projectId);

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch(error){
        console.error("Delete project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete  project"
        });
    }
};

export {
    createProject,
    getMyProjects,
    getProject,
    updateProject,
    deleteProject
}