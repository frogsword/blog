require("dotenv").config();
require('./passport/passport');
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const passport = require('passport')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const apiRouter = require("./routes/api")

const app = express();

//db
mongoose.connect(process.env.DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cookieParser())

let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173", "https://frogsword-blog-api.adaptable.app"],
    optionsSuccessStatus: 200,
}
app.options("*", cors(corsOptions))

app.use("/api", cors(corsOptions), apiRouter);

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.listen(process.env.PORT || 3000, () => {console.log("listening on port " + process.env.PORT)})
