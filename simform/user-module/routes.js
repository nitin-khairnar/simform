const express = require("express");
const jwt = require("../helper/utils.js");
const router = express.Router();
const service = require("./service.js");

// use sign-up API
router.post("/sign-up", service.userSignUp);

// user sign-in
router.post("/sign-in", service.userSignIn);

// get by user by user ID
router.get("/:userId", jwt.verifyJWT, service.getUserById);

// edit user details
router.put("/edit/:userId", jwt.verifyJWT, service.editUser);

// get all users
router.get("/all/:pageNumber", jwt.verifyJWT, service.getAllusers);

// refresh token API
router.get("/refresh-token/:id", service.refreshToken);

module.exports = router;
