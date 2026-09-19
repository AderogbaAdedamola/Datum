import mongoose from "mongoose";

const surveySchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    status: {
        type: String,
        enum: ["draft", "active", "inactive"],
        default: "active"
    },

    questions: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true
            },

            order: {
                type: Number,
                required: true
            }
        }
    ],
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Survey", surveySchema);