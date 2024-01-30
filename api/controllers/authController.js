const jwt = require("jsonwebtoken")
const passport = require("passport")
const bcrypt = require("bcrypt")
const {body, validationResult} = require("express-validator");
const User = require("../models/user")
require("dotenv").config();

exports.register = [
    body("username").trim().escape(),
    body("password").trim().escape(),
    body("confirm").trim().escape(),

    async(req, res, next) => {
        const duplicateUsername = await User.find({username: req.body.username})
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.status(403).json({
                errors: errors.array(),
                message: "error: registration failed"
            })
        }

        else if(duplicateUsername.length > 0) {
            res.status(403).json({
                message: "Username already exists. Select another Username.",
            })   
        }

        else if(!req.body.password.length > 7) {
            res.status(403).json({
                message: "Password must be at least 8 characters in length.",
            })   
        }

        else if(req.body.password.lower() != req.body.password) {
            res.status(403).json({
                message: "Password must include at least one uppercase letter.",
            })   
        }

        else if(req.body.password !== req.body.confirm) {
            res.status(403).json({
                message: "Passwords do not match.",
            })   
        }

        else {
            bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
                if (err) {
                    return next(err)
                }

                else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPass,
                    })

                    user.save()

                    res.status(200).json({
                        username: req.body.username,
                    })
                    return
                }
            })
        }
    }
]

exports.login = async function (req, res, next) {
    const loginUser = await User.findOne({username: req.body.username})

    passport.authenticate("local", {session: false}, (err, user) => {
        user = loginUser;
        if (err || !user) {
            return res.status(403).json({
                message: "Incorrect username or password."
            })
        }
        req.login(user, {session: false}, (err) => {
            const body = {_id: user._id, username: user.username, isAuthor: user.isAuthor}

            jwt.sign(
                {user: body},
                process.env.SECRET_KEY,
                {expiresIn: '1d'},
                (err, token) => {
                    if (err) {
                        return res.status(400).json(err)
                    }
    
                    res.json({
                        token: token,
                        user: body
                    })
                }
            )
        })
    }) (req, res)
}

exports.authStatus = function(req, res, next) {
        jwt.verify(req.token, process.env.SECRET_KEY, async(err, authData) => {
            if (err) {
                res.json({
                    isAuthenticated: false,
                })
                return
            }
            res.json({
                isAuthenticated: true,
                authData
            })
        })    
}