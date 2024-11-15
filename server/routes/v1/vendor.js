const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { VendorController } = require("../../controllers");
const router = express.Router();

router.post("/add-medicine", verifyJWT, VendorController.addMedicine);
router.get("/all-medicine", verifyJWT, VendorController.getAllMedicine);
router.delete("/delete/:id", verifyJWT, VendorController.deleteMedicine);

module.exports = router;
