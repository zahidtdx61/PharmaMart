const express = require("express");
const { UserController } = require("../../controllers");
const { createJWT } = require("../../middlewares");
const router = express.Router();

router.post("/register", createJWT, UserController.register);

module.exports = router;
