const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "API is working!",
    data: {},
    error: {},
  });
});

router.use("/user", require("./user"));
router.use("/vendor", require("./vendor"));
router.use("/medicine", require("./medicine"));
router.use("/admin", require("./admin"));
router.use("/payment", require("./payment"));

module.exports = router;
