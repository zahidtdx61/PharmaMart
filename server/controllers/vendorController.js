const { StatusCodes } = require("http-status-codes");
const Medicine = require("../models/medicine");

const addMedicine = async (req, res) => {
  const medicine = req.body;
  console.log(medicine);

  try {
    const newMedicine = await Medicine.create(medicine);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Medicine added successfully",
      data: newMedicine,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Medicine not added",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  addMedicine,
};
