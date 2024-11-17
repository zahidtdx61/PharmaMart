const express = require("express");
const { verifyJWT } = require("../../middlewares");
const { PaymentController } = require("../../controllers");
const router = express.Router();

router.post(
  "/create-checkout-session",
  verifyJWT,
  PaymentController.createCheckoutSession
);
router.post("/complete-payment", verifyJWT, PaymentController.completePayment);
router.get("/invoice/:transaction_id", PaymentController.getInvoice);

module.exports = router;
