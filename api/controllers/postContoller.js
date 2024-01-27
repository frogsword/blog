const {body, validationResult} = require("express-validator");
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const Post = require("../models/post")
const Comment = require("../models/comment");
require("dotenv").config();

exports.allPosts = async function(req, res, next) {
    const posts = await Post.find().sort({dateCreated: -1}).populate('dateCreated').exec()

    return res.status(200).json(posts)
}

exports.singlePost = async function(req, res, next) {
    const post = await Post.findById(req.params.postid).populate('author comments').exec()

    return res.status(200).json(post)
}

exports.createPost = [
    body("title").trim().escape(),
    body("text").trim().escape(),

    async(req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
                // if author
                if (authData.user.isAuthor) {
                    if (err) {
                        res.status(403).json({msg: "err 403"})
                    }
                    else {
                        const post = new Post({
                            title: req.body.title,
                            text: req.body.text,
                            author: authData.user._id
                        })
                
                        await post.save();
            
                        res.status(200).json({
                            post, 
                            token: req.token, 
                            authData,
                        })
                    }
                }
                // not author
                else {
                    res.status(403).json({
                        message: "not authorized",
                        user: authData,
                    })
                }
        })
    }
]

exports.updatePost = [
    body("title").trim().escape(),
    body("text").trim().escape(),

    async(req, res, next) => {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
            //if author
            if (authData.user.isAuthor) {
                if (err) {
                    res.status(403).json({msg: "err 403"})
                }
                else {
                    const newPost = await Post.findOneAndUpdate({_id: req.params.postid}, {
                        title: req.body.title,
                        text: req.body.text,
                        author: authData.user._id
                    })
                
                    res.status(200).json({
                        newPost, 
                        token: req.token, 
                        data: authData
                    })
                }
            }
            //not author
            else {
                res.status(403).json({
                    message: "not authorized"
                })
            }
        })
    }
]

exports.deletePost = async(req, res, next) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
        //if author
        if (authData.user.isAuthor) {
            if (err) {
                res.status(403).json({msg: "err 403"})
            }
            else {
                await Post.findByIdAndDelete(req.params.postid)
        
                res.status(200).json({
                    token: req.token, 
                    data: authData
                })
            }
        }
        //not author
        else {
            res.status(403).json({
                message: "not authorized"
            })
        }
        })
}
