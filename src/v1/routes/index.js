const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const authController = require("../controllers/authController");


router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authController.login
);

router.post('/register', authController.register)

router.post('/google', authController.google)


// router.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.json({
//       status: 200,
//       message: "logout success",
//     });
//   });
// });

module.exports = router;
