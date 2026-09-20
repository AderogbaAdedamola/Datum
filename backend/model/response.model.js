import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
    {
        surveyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Survey",
            required: true
        },

        respondentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        answers: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                    required: true
                },

                answer: {
                    type: mongoose.Schema.Types.Mixed,
                    required: true
                }
            }
        ],

        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);

responseSchema.index(
    { surveyId: 1, respondentId: 1 },
    { unique: true }
);

const Response = mongoose.model("Response", responseSchema);
export default Response;