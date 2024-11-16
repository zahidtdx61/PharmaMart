const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { AdminController } = require("../../controllers");
const router = express.Router();

router.get("/all-users", verifyJWT, AdminController.getAllUsers);
router.put("/update-user/:id", verifyJWT, AdminController.updateUser);

module.exports = router;