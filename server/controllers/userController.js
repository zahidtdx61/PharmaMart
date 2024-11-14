const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

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

module.exports = {
  register,
};
