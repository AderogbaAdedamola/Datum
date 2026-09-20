import Question from "../model/question.model.js";

const createQuestion = async (req, res) => {
    try {
        const {question, type, required, options} = req.body;

        if (!question || !type){
            return res.status(400).json({
                success: false,
                message: "Question and type are required"
            });
        }

        const choiceTypes = [
            "singleChoice",
            "multipleChoice"
        ];

        if (choiceTypes.includes(type) && (!options || options.length === 0)){
                return res.status(400).json({
                    success: false,
                    message: "Options are required for choice questions"
                });
        };

        const newQuestion = await Question.create({
            question,
            type,
            required: required ?? false,
            options: options ?? []
        });

        return res.status(201).json({
            success: true,
            message: "Question created successfully",
            question: newQuestion
        });
    } catch (error){
        console.error("Create question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create question"
        });
    }
};

const getQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        return res.status(200).json({
            success: true,
            question
        });
    } catch (error) {
        console.error("Get question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve qeustion"
        });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        const {
            question,
            type,
            required,
            options
        } = req.body;

        const existingQuestion = await Question.findById(questionId);

        if (!existingQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        if (question !== undefined){
            existingQuestion.question = question;
        }

        if (type !== undefined){
            existingQuestion.type = type;
        }

        if (required !== undefined){
            existingQuestion.required = required;
        }

        if (options !== undefined){
            existingQuestion.options = options;
        }

        await existingQuestion.save();

        return res.status(200).json({
            success: true,
            message: "Question updated successfully",
            question: existingQuestion
        });

    } catch (error) {
        console.error("Update question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update question"
        });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        const question = await Question.findById(questionId);

        if(!question){
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        await Question.findByIdAndDelete(questionId);

        return res.status(200).json({
            success: true,
            message: "Question deleted successfully"
        });

    } catch (error) {
        console.error("Delete question error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete question"
        });
    }
};

export {
    createQuestion,
    updateQuestion,
    getQuestion,
    deleteQuestion
}