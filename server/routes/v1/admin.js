const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { AdminController } = require("../../controllers");
const router = express.Router();

router.get("/all-users", verifyJWT, AdminController.getAllUsers);
router.put("/update-user/:id", verifyJWT, AdminController.updateUser);
router.put("/update-category/:id", verifyJWT, AdminController.updateCategory);
router.put("/approve-payment/:id", verifyJWT, AdminController.approvePayment);
router.get("/all-payments", verifyJWT, AdminController.getAllPayments);
router.get("/all-single-payments", verifyJWT, AdminController.getAllSinglePayments)

module.exports = router;
