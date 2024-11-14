const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { name, image, email, uid } = req.body;
    const user = await User.create({
      name,
      image,
      email,
      uid,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully!",
      data: user,
      error: {},
    });
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "User already exists!",
        data: {},
        error: error.message,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "User registration failed!",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  register,
};
