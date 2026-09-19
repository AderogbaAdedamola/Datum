const questionSchema = new mongoose.Schema({
    detail: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: [
            "text",
            "single_choice",
            "multiple_choice",
            "rating",
            "number"
        ],
        required: true
    },

    required: {
        type: Boolean,
        default: false
    },

    options: [
        {
            label: {
                type: String,
                enum: ["A", "B", "C", "D", "E"],
                required: true
            },

            value: {
                type: String,
                required: true
            }
        }
    ]
});

export default mongoose.model("Question", questionSchema);