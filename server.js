require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const corsConfig = require('./src/v1/config/cors')
const authRoute = require("./src/v1/routes");
const passport = require("passport");
const session = require('express-session')
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors(corsConfig));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000*60*60 },
  name: 'auth'
}))

require("./src/v1/config/passport");
app.use(passport.initialize())
app.use(passport.session())


app.get("/home", (req, res) => {
  res.json({ user: req.session });
});

app.use("/auth", authRoute);


app.use((error, req, res, next) => {
  const err = createError(error.status || 500);
  res.json({
    status: err.status,
    success: err.message,
  });
});

app.listen(port, () => {
  console.log(`server start on port: ${port}`);
});
