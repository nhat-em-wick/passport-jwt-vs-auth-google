const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

// JWT
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: process.env.JWT_KEY
}, (payload, done) => {
  try {
    //  check user exist and insert DB
    done(null, { name: payload.name , id: payload.id})
  } catch (error) {
    console.error(`Error ::: ${error}`)
    done(error, false)
  }
}))


passport.serializeUser((user, next) => {
  try {
    next(null, user)
  } catch (error) {
    next(error, false)
  }
})

passport.deserializeUser((user, next) => {
  try {
    next(null, user)
  } catch (error) {
    next(error, false)
  }
})