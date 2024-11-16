const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Medicine = require("../models/medicine");

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
}

module.exports = {
  register,
  getRole,
  getProfile,
  logout,
};
