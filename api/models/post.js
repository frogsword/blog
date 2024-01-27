const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const moment = require("moment")

const PostSchema = new Schema({
    title: {type: String, minLength: 1, required: true},
    text: {type: String, minLength: 1, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    dateCreated: {type: Date, default: moment().format()},
})

PostSchema.virtual("post_date_formatted").get(function () {
	time = this.dateCreated.toLocaleTimeString("en-US");
	date = this.dateCreated.toDateString();
	return `${time} • ${date}`;
});
PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Post", PostSchema)