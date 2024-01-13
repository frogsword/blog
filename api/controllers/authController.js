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
                username: req.body.username,
                errors: errors.array()
            })
        }

        if((req.body.password !== req.body.confirm) && (req.body.password.length > 6)) {
            res.status(403).json({
                message: "passwords do not match, make sure each password matches and is at least 6 characters long",
            })   
        }

        if(duplicateUsername.length > 0) {
            res.status(403).json({
                message: "username already exists",
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
                        message: "user created successfully",
                        username: req.body.username,
                    })
                    return
                }
            })
        }
    }
]

exports.login = async function (req, res, next) {
    const loginUser = await User.findOne({username: req.body.username})//for postman test

    passport.authenticate("local", {session: false}, (err, user) => {
        user = loginUser;
        if (err || !user) {
            return res.status(403).json({
                message: "incorrect username or password"
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