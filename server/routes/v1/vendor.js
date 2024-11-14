const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { VendorController } = require("../../controllers");
const router = express.Router();

router.post("/add-medicine", verifyJWT, VendorController.addMedicine);

module.exports = router;
