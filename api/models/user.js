const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    isAuthor: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
})

module.exports = mongoose.model("User", UserSchema)