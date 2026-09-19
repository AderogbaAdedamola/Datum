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

    password: {
        type: String,
        required: true,
        select: false
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

    role: {
        type: String,
        enum: ["researcher", "student", "admin"],
        required: true,
        default: true
    },

    dateOfBirth: Date,
    gender: {
        type: String,
        enum: ["male", "female", "other", "preferNotToSay"]
    },

    location: {
        country: String,
        state: String,
        city: String
    },

    education: {
        institution: String,
        faculty: String,
        department: String,
        level: String,
        graduationYear: Number
    },

    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
});

export default mongoose.model("User", userSchema);