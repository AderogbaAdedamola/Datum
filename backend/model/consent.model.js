import mongoose from "mongoose";

const consentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    purpose: {
        type: String,
        enum: [
            "profile_prefill",
            "research_matching",
            "research_data_collection",
        ],
        required: true
    },

    fields: [{
        type: String
    }],

    granted: {
        type: Boolean,
        required: true
    },

    grantedAt: Date,
    revokedAt: Date,

    version: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})


export default mongoose.model("Consent", consentSchema)