import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        enum: [
            "email",
            "phone",
            "institution",
            "studentStatus",
            "identity"
        ],
        required: true
    },

    method: {
        type: String,
        enum: [
            "otp",
            "institutionEmail",
            "document",
            "ninAuth",
            "manualReview"
        ],
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "verified", "rejected", "expired"],
        default: "pending"
    },

    verifiedAt: Date,
    expiresAt: Date,

    metadata: mongoose.Schema.Types.Mixed
},
{
    timestamps: true
});