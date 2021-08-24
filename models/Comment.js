const { Schema, model } = require("mongoose")

const CommentSchema = new Schema({
    wriitenBy: {
        type: String
    },
    commenntBody: {
        type: String
    },
    ccreatedAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = model("Comment", CommentSchema)

module.exports = Comment