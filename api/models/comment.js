const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {type: String, minLength: 1, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    parentComment: {type: Schema.Types.ObjectId, ref: 'Comment'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dateCreated: {type: Date, default: Date.now},
})

module.exports = mongoose.model("Comment", CommentSchema)