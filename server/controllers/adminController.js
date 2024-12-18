const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Category = require("../models/category");
const Payment = require("../models/payment");
const SinglePayment = require("../models/singlePayment");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All users",
      data: users,
      error: {},
    });
  } catch (error) {
    // console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Users not found",
      data: {},
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  delete body.uid;
  body.updatedAt = new Date();

  try {
    const user = await User.findByIdAndUpdate(id, body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User updated successfully",
      data: user,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User not found",
      data: {},
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  body.updatedAt = new Date();

  try {
    const category = await Category.findByIdAndUpdate(id, body);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Category updated successfully",
      data: category,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Category not found",
      data: {},
      error: error.message,
    });
  }
};

const approvePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Payment not found",
        data: {},
        error: {},
      });
    }

    payment.status = "approved";
    payment.updatedAt = new Date();
    await payment.save();

    await SinglePayment.updateMany(
      { transaction_id: payment.transaction_id },
      { status: "approved" }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment approved",
      data: payment,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Payment not approved",
      data: {},
      error: error.message,
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("buyer_id");
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All payments",
      data: payments,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Payments not found",
      data: {},
      error: error.message,
    });
  }
};

const getAllSinglePayments = async (req, res) => {
  try {
    const payments = await SinglePayment.find()
      .populate("buyer_id")
      .populate("vendor_id");

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Payments found",
      data: payments,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Payments not found",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  updateCategory,
  approvePayment,
  getAllPayments,
  getAllSinglePayments,
};
