import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    avatar: String,

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },

    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },

    occupation: {
        type: String,
        enum: ["researcher", "student"],
        required: true,
        default: true
    },
},
{
    timestamps: true,
});

export default mongoose.model("User", userSchema);