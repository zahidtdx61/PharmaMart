const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

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


module.exports = {
  getAllUsers,
  updateUser,
};
