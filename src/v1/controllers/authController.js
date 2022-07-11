const jwt = require("jsonwebtoken");
const axios = require("axios");

const encodeToken = (user) => {
  return jwt.sign(
    {
      user,
    },
    process.env.JWT_KEY,
    { expiresIn: "10m" }
  );
};

const authController = {
  login: async (req, res, next) => {
    console.log("controller: ", req.user);
  },
  register: async (req, res, next) => {
    const id = 1234;
    const name = req.body.name;
    const accessToken = encodeToken({ id, name });
    res.json({
      accessToken,
    });
  },
  google: async (req, res, next) => {
    const { access_token } = req.body;
    try {
      const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`;
      const profile = await axios.get(url);
      const user = profile.data
      // check db
      const accessToken = encodeToken({ name: user.name });
      res.json({
        user: {
          name: user.name,
          photo: user.picture,
        },
        accessToken
      })
    } catch (error) {
      console.error(`Error ::: ${error}`);
      next(error);
    }
  },
};

module.exports = authController;
