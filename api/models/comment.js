const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {type: String, minLength: 1, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    parentComment: {type: Schema.Types.ObjectId, ref: 'Comment'},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true, autopopulate: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment', autopopulate: true}],
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dateCreated: {type: Date, default: Date.now},
})

CommentSchema.virtual("post_date_formatted").get(function () {
	time = this.dateCreated.toLocaleTimeString("en-US");
	date = this.dateCreated.toDateString();
	return `${time} • ${date}`;
});
CommentSchema.set('toObject', { virtuals: true });
CommentSchema.set('toJSON', { virtuals: true });

CommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Comment", CommentSchema)