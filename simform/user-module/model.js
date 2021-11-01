const userSchema = require("../schema/user-schema.js");
const model = {};

model._userSignUp = (signUpObj) => {
  return new Promise((resolve, reject) => {
    let query = new userSchema(signUpObj);
    query
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

model._getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    userSchema
      .findOne({ userID: userId })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

model._getAllusers = (limit, skipValue) => {
  return new Promise((resolve, reject) => {
    userSchema
      .find({})
      .skip(skipValue)
      .limit(limit)
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

model._getUserByEmailID = (emailID) => {
  return new Promise((resolve, reject) => {
    userSchema
      .findOne({ emailID: emailID })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

model._getUserByMongoId = (id) => {
  return new Promise((resolve, reject) => {
    userSchema
      .findOne({ _id: id })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

model._editUser = (userId, editObj) => {
  return new Promise((resolve, reject) => {
    userSchema
      .findOneAndUpdate({ userId: userId }, editObj)
      .then((result) => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = model;
