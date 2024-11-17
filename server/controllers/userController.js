const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Medicine = require("../models/medicine");
const Payment = require("../models/payment");
const SinglePayment = require("../models/singlePayment");

const register = async (req, res) => {
  const user = req.body;

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  try {
    const existingUser = await User.findOne({ uid: user?.uid });
    const { token } = req.body;

    if (existingUser) {
      const updatedUser = await User.findByIdAndUpdate(existingUser._id, user);
      return res
        .cookie("token", token, cookieOptions)
        .status(StatusCodes.OK)
        .json({
          success: true,
          message: "User tokenized successfully",
          data: updatedUser,
          error: {},
        });
    }

    const newUser = await User.create(user);
    return res
      .cookie("token", token, cookieOptions)
      .status(StatusCodes.CREATED)
      .json({
        success: true,
        message: "User created successfully",
        data: newUser,
        error: {},
      });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User not created",
      data: {},
      error: error.message,
    });
  }
};

const getRole = async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User role fetched successfully",
      data: {
        role: user?.role,
      },
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User role not fetched",
      data: {},
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });
    const medicines = await Medicine.find({ vendor_id: user._id });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: "User not found",
      });
    }

    const userData = {
      ...user._doc,
      medicines,
    };

    // console.log(userData);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User profile fetched successfully",
      data: userData,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User profile not fetched",
      data: {},
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged out successfully",
    data: {},
    error: {},
  });
};

const getOrders = async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: "User not found",
      });
    }

    const orders = await Payment.find({ buyer_id: user._id });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Orders not fetched",
      data: {},
      error: error.message,
    });
  }
};

const getPayments = async (req, res) => {
  try {
    const { uid } = req.body;
    const user = await User.findOne({ uid });
    const history = await SinglePayment.find({
      $or: [{ vendor_id: user._id }, { buyer_id: user._id }],
    }).populate("vendor_id").populate("buyer_id");

    if (!history) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "History not found",
        data: {},
        error: "History not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "History fetched successfully",
      data: history,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "History not fetched",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  register,
  getRole,
  getProfile,
  logout,
  getOrders,
  getPayments,
};
