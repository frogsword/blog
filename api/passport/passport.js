const passport = require("passport");
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const User = require('../models/user');
require("dotenv").config();

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({username: username})
			if (!user) {
				return done(null, false, {message: "incorrect username"})
			}
			const match = await bcrypt.compare(password, user.password)
			if (!match) {
				return done(null, false, {message: "incorrect password"})
			}
			return done(null, user)
		} 
		catch (err) {
			return done(err)
		}
	})
)

// passport.use(
// 	new JwtStrategy({
// 	  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 	  secretOrKey: process.env.SECRET_KEY
// 	},
// 	async (token, done) => {
// 	  try {
// 		return done(null, token.user)
// 	  } catch(error){
// 		return done(error)
// 		}
// 	  }
// 	)
//   );
// let opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRET_KEY;


// passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
// 	const userId = jwt_payload.sub
// 	const user = await User.findById(userId)
// 		// if (err) {
// 		// 	return done(err, false)
// 		// }
// 		if (user) {
// 			return done(null, user)
// 		}
// 		else {
// 			return done(null, false)
// 		}
// }))