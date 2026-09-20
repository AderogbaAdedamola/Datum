import Survey from "../model/survey.model.js";
import Project from "../model/project.model.js"

const createSurvey = async (req, res) => {
    try {
        const { projectId, title, description } = req.body;

        if (!projectId || !title){
            return res.status(400).json({
                success: false,
                message: "Project ID and survey title are required"
            });
        }

        const project = await Project.findOne({
            _id: projectId,
            researcherId: req.user._id
        });

        if (!project){
            return res.status(404).json({
                success: false,
                message: "Project not found or you do not own this project"
            });
        }

        const survey = await Survey.create({
            projectId,
            title,
            description,
            status: "inactive"
        });

        return res.status(201).json({
            success: true,
            message: "Survey created successfully",
            survey
        });
    } catch (error){
        console.error("Create survey error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create survey"
        });
    }
};

const getSurvey = async (req, res) => {
    try {
        const { surveyId } = req.params;

        const survey = await Survey
            .findById(surveyId)
            .populate("projectId")
            .populate("questions.questionId")
        
        if (!survey){
            return res.status(404).json({
                success: false,
                message: "Survey not found"
            });
        }

        return res.status(200).json({
            success: true,
            survey
        });
    } catch (error){
        console.error("Get survey error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve survey"
        });
    }
};

const getProjectSurveys = async (req, res) => {
    try {
        const { projectId } = req.params;

        const surveys = await Survey.find({ projectId }).populate("questions.questionId").sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            count: surveys.length,
            surveys
        });
    } catch (error){
        console.error("Get project survey error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve surveys"
        });
    }
};

const updateSurvey = async (req, res) => {
    try {
        const {surveyId} = req.params;

        const {
            title,
            description,
            status
        } = req.body;

        const survey = await Survey.findById(surveyId);

        if (!survey) {
            return res.status(404).json({
                success: false,
                message: "Survey not found"
            });
        }

        if (title !== undefined){
            survey.title = title;
        }

        if (description !== undefined){
            survey.description = description;
        }

        if (status !== undefined){
            survey.status = status;
        }

        await survey.save();

        return res.status (200).json({
            success: true,
            message: "Survey updated sucessfully",
            survey
        });
    } catch (error){
        console.error ("Update survey errror:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update survey"
        });
    }
};

const deleteSurvey = async (req, res) => {
    try {
        const { surveyId } = req.params;

        const survey = await Survey.findById(surveyId);

        if (!survey){
            return res.status(404).json({
                success: false,
                message: "Survey not found",
            })
        };


        await Survey.findByIdAndDelete(surveyId);

        return res.status(200).json({
            success: true,
            message: 'Survey deleted successfully'
        });
    } catch (error) {
        console.error("Delete survey error:", errpr);
        
        return res.status(500).json({
            success: false,
            message: "Failed to delete survey"
        })
    }
};

const addQuestionToSurvey = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const { questionId } = req.body;

        if (!questionId){
            return res.status(400).json({
                success: false,
                message: "Question ID is required"
            });
        }

        const survey = await Survey.findById(surveyId);

        if (!survey) {
            return res.status(404).json({
                success: false,
                message: "Survey not found"
            });
        }

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        const alreadyExists = survey.questions.some(
            (q) => q.questionId.toString() === questionId
        );

        if (alreadyExists){
            return res.status(409).json({
                success: false,
                message: "Question already exists in this survey"
            });
        }

        survey.questions.pus({
            questionId
        });

        await survey.save();
        return res.status(200).json({
            success: true,
            message: "Question added to survey successfully",
            survey
        });
    } catch (error) {
        console.error("Add question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add question to survey"
        });
    }
};

const removeQuestion = async (req, res) => {
    try {
        const { surveyId, questionId } = req.params;

        const survey = await Survey.findById(surveyId);

        if (!survey){
            return res.status(404).json({
                success: false,
                message: "Survey not found"
            });
        }

        const questionExists = survey.questions.some(
            (q) => q.questionId.toString() === questionId
        );

        if (!questionExists){
            return res.status(404).json({
                success: false,
                message: "Question is not attached to this survey"
            });
        }

        survey.questions = survey.questions.filter(
            (q) => q.questionId.toString() !== questionId
        );

        await survey.save();

        return res.status(200).json({
            success: true,
            message: "Question removed from survey successfully",
            survey
        });
    } catch (error) {
        console.error("Remove question error", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove question"
        });
    }
};

export {
    createSurvey,
    getSurvey,
    getProjectSurveys,
    updateSurvey,
    deleteSurvey,
    addQuestionToSurvey,
    removeQuestion
}