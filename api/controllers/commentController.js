const {body, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment");
const e = require("express");
require("dotenv").config();

exports.allCommentsOnPost = async function(req, res, next) {
    const comments = await Comment.find({post: req.params.postid}).sort({dateCreated: -1}).exec()

    return res.status(200).json(comments)
}

exports.parentCommentAndChildrenComments = async function(req, res, next) {
    const parentComment = await Comment.findById(req.params.commentid).populate('comments').exec()

    return res.status(200).json({
        parentComment,
        childern: parentComment.comments
    })
}

exports.singleComment = async function(req, res, next) {
    const comment = await Comment.findById(req.params.commentid).populate('parentComment post comments user').exec()

    return res.status(200).json(comment)
}

exports.createCommentOnPost = [
    body("comment").trim().escape(),

    async(req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
                    if (err) {
                        res.status(403).json({msg: "err 403"})
                    }
                    else {
                        //new comment
                        const comment = new Comment({
                            comment: req.body.comment,
                            post: req.params.postid,
                            user: authData.user._id
                        })
                        await comment.save();

                        //update post comments
                        // await Post.findByIdAndUpdate(req.params.postid, {$push: {comments: comment}})

                        //update user comments
                        // await User.findByIdAndUpdate(authData.user._id, {$push: {comments: comment}})
            
                        res.status(200).json({
                            comment, 
                        })
                    }
        })
    }
]

exports.createCommentOnComment = [
    body("comment").trim().escape(),

    async(req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
                    if (err) {
                        res.status(403).json({msg: "err 403"})
                    }
                    else {
                        //new comment on previous comment
                        const comment = new Comment({
                            comment: req.body.comment,
                            user: authData.user._id,
                            parentComment: req.params.commentid
                        })
                        await comment.save();

                        //update previous comment
                        await Comment.findByIdAndUpdate(req.params.commentid, {$push: {comments: comment}})

                        //update post comments
                        await Post.findByIdAndUpdate(req.params.postid, {$push: {comments: comment}})

                        //update user comments
                        await User.findByIdAndUpdate(authData.user._id, {$push: {comments: comment}})
            
                        res.status(200).json({
                            comment, 
                            token: req.token, 
                            authData,
                        })
                    }
        })
    }
]

exports.updateComment = [
    body("comment").trim().escape(),

    async(req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {

            const commentToUpdate = await Comment.findById(req.params.commentid).exec()
            const currentUser = await User.findById(authData.user._id).exec()
            const isAuthorizedToUpdate = currentUser.comments.includes(commentToUpdate._id)

            //if authorized
            if (isAuthorizedToUpdate) {
                if (err) {
                    res.status(403).json({msg: "err 403"})
                }
                else {
                    const updatedComment = await Comment.findOneAndUpdate({_id: req.params.commentid}, {
                        comment: req.body.comment
                    })
                
                    res.status(200).json({
                        updatedComment, 
                        token: req.token, 
                        data: authData
                    })
                }
            }
            //not authorized
            else {
                res.status(403).json({
                    message: "cannot update comment"
                })
            }
        })
    }
]

exports.deleteComment = [
    async(req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {

            const commentToDelete = await Comment.findById(req.params.commentid).exec()
            const currentUser = await User.findById(authData.user._id).exec()

            const isAuthorizedToDelete = currentUser.comments.includes(commentToDelete._id)

            //if authorized
            if (isAuthorizedToDelete) {
                if (err) {
                    res.status(403).json({msg: "err 403"})
                }
                else {
                    const updatedComment = await Comment.findOneAndDelete({_id: req.params.commentid})
                
                    res.status(200).json({
                        "message": "delete success"
                    })
                }
            }
            //not authorized
            else {
                res.status(403).json({
                    message: "cannot delete comment"
                })
            }
        })
    }
]