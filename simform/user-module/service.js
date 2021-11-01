const model = require("./model");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const uuid = require("uuid");
const utils = require("../helper/utils.js");
const service = {};

service.userSignUp = async (req, res, next) => {
  try {
    let body = req.body ? req.body : null;
    if (body) {
      let { firstName, lastName, emailID, password } = body;
      if (!firstName || !lastName || !emailID || !password) {
        res.status(400).json("Invalid parameters!");
      } else {
        let signUpObj = {
          userId: uuid.v1(),
          firstName: firstName,
          lastName: lastName,
          emailID: emailID,
          password: md5(password),
          createdDate: new Date(),
          updatedDate: new Date(),
        };
        await model._userSignUp(signUpObj);
        res.status(200).json("Sign-up successfull!");
      }
    } else {
      res.status(400).json("Invalid request!");
    }
  } catch (err) {
    next(err);
  }
};

service.getUserById = async (req, res, next) => {
  try {
    let userId = req.params.userId ? req.params.userId : null;
    if (userId) {
      let user = await model._getUserById(userId);
      res.status(200).json({ user: user });
    } else {
      res.status(400).json("Invalid parameters!");
    }
  } catch (err) {
    next(err);
  }
};

service.getAllusers = async (req, res, next) => {
  try {
    let pageNumber = req.params.pageNumber ? req.params.pageNumber : 1;
    let limit = 100;
    let skipValue = (pageNumber - 1) * limit;
    let users = await model._getAllusers(limit, skipValue);
    res.status(200).json({ users: users });
  } catch (err) {
    next(err);
  }
};

service.userSignIn = async (req, res, next) => {
  try {
    let body = req.body;
    let emailID = body.emailID ? body.emailID : null;
    let password = body.password ? body.password : null;
    if (emailID && password) {
      let user = await model._getUserByEmailID(emailID);
      if (user) {
        let validatePassword = await utils.validatePassword(
          password,
          user.password
        );
        if (validatePassword) {
          let userData = { _id: user._id, emailID: emailID };
          let token = await utils.getToken(userData);
          res
            .status(200)
            .json({ userId: user.userId, token: `Bearer ${token}` });
        }
      } else {
        res.status(400).json("User does not exists!");
      }
    } else {
      res.status(400).json("Invalid request!");
    }
  } catch (err) {
    next(err);
  }
};

service.refreshToken = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (id) {
      let user = await model._getUserById(id);
      if (user) {
        let userData = { _id: user._id, emailID: user.emailID };
        let token = jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });
        res.status(200).json({ userId: user.userId, token: `Bearer ${token}` });
      }
    } else {
      res.status(400).json("Invalid request!");
    }
  } catch (err) {
    next(err);
  }
};

service.editUser = async (req, res, next) => {
  try {
    let body = req.body;
    let userId = req.params.userId;
    if (userId) {
      let { firstName, lastName, emailID, password } = body;
      let editObj = {
        firstName: firstName,
        lastName: lastName,
        emailID: emailID,
        password: md5(password),
      };
      let resp = await model._editUser(userId, editObj);
      if (resp) {
        res.status(200).json("User updated successfully!");
      } else {
        res.status(400).json("Unable update user!");
      }
    } else {
      res.status(400).json("Invalid request!");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = service;
