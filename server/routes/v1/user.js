const express = require("express");
const { UserController } = require("../../controllers");
const { createJWT, verifyJWT } = require("../../middlewares");
const router = express.Router();

router.post("/register", createJWT, UserController.register);
router.get("/profile", verifyJWT, UserController.getProfile);
router.get("/role", verifyJWT, UserController.getRole);
router.get("/logout", verifyJWT, UserController.logout);
router.get("/orders", verifyJWT, UserController.getOrders);

module.exports = router;
