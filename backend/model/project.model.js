import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    researcherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    status: {
        type: String,
        enum: ["draft", "active", "paused", "completed"],

    },

    targetParticipants: {           //possibly expand the scope instead of just for students to also accomodate other stuffs likewise
        type: String
    },
},
{
    timestamps: true,
});

export default mongoose.model("Project", projectSchema);