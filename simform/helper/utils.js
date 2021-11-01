const md5 = require("md5");
const jwt = require("jsonwebtoken");

async function validatePassword(userEnteredPass, dbPassword) {
  userEnteredPass = md5(userEnteredPass);
  return userEnteredPass === dbPassword;
}

async function getToken(userData) {
  return jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
}

async function verifyJWT(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader != undefined) {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json("Invalid token: " + err.message);
        }
        req._id = decoded.userData._id;
        next();
      });
    } else {
      res.status(401).json("Token not passed!");
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validatePassword: validatePassword,
  verifyJWT: verifyJWT,
  getToken: getToken,
};
