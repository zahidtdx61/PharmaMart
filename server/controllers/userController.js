const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const register = async (req, res) => {
  const { name, image, email, uid } = req.body;
  const user = await User.create({
    name,
    image,
    email,
    uid,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "User registered successfully!",
    data: user,
    error: {},
  });
};

module.exports = {
  register,
};
