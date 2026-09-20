import Response from "../model/response.model.js";
import Survey from "../model/surver.mdoel.js";

const submitRespose = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const { answers } = req.body;

        const respondentId = req.user._id;

        const survey = await Survey.findById(surveyId);

        if (!survey){
            return res.status(404).json({
                success: false,
                message: "Survey not found"
            });
        }

        if (survey.status !== "active"){
            return res.status(400).json({
                success: false,
                message: "This survey is not currently active"
            });
        }

        if (!Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Answers are required"
            });
        }

        const existingResponse = await Response.findOne({
            surveyId,
            respondentId
        });

        if (existingResponse) {
            return res.status(409).json({
                success: false,
                message: "You have already submitted a response to this survey"
            });
        }

        const surveyQuestionids = survey.questions.map(
            question => question.questionId.toString()
        );

        for (const answer of answers){
            if (!answer.questionId || answer.answer === undefined){
                return res.status(400).json({
                    success: false,
                    message: "Each answer must contain a questionId and answer"
                });
            }

            if (!surveyQuestionids.includes(answer.questionId.toString())){
                return res.status(400).json({
                    success: false,
                    message: `Question ${answer.questionId} does not belong to this survey`
                });
            }
        }

        const response = await Response.create({
            surveyId,
            respondentId,
            answers
        });

        return res.status(201).json({
            success: true,
            message: "Response submitted successfully",
            response
        });
    } catch (error) {
        console.error("Submit response error:", error);

        return res.status(500).json({
            success: false,
            messsage: "Failed to submit response"
        });
    }
}