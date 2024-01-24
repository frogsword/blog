const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, minLength: 1, required: true},
    text: {type: String, minLength: 1, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    dateCreated: {type: Date, default: Date.now},
})

PostSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Post", PostSchema)