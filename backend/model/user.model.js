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