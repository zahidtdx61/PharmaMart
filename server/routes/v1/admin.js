const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { AdminController } = require("../../controllers");
const router = express.Router();

router.get("/all-users", verifyJWT, AdminController.getAllUsers);

module.exports = router;