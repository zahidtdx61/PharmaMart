const { StatusCodes } = require("http-status-codes");
const Medicine = require("../models/medicine");
const User = require("../models/user");
const Category = require("../models/category");

const addMedicine = async (req, res) => {
  const medicine = req.body;
  const { expiryDate, manufactureDate } = medicine;

  if (manufactureDate) {
    medicine.manufacturingDate = new Date(manufactureDate);
  }
  if (expiryDate) {
    medicine.expiryDate = new Date(expiryDate);
  }
  try {
    const vendor = await User.findOne({ uid: medicine.vendorId });
    if (!vendor) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Vendor not found",
        data: {},
        error: "Vendor not found",
      });
    }

    const categoryData = await Category.findOne({ _id: medicine.categoryId });
    if (!categoryData) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Category not found",
        data: {},
        error: "Category not found",
      });
    }

    const newMedicine = await Medicine.create({
      ...medicine,
      vendor_id: vendor._id,
      category: categoryData._id,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Medicine added successfully",
      data: newMedicine,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Medicine not added",
      data: {},
      error: error.message,
    });
  }
};

const getAllMedicine = async (req, res) => {
  try {
    const { uid } = req.body;
    const vendor = await User.findOne({ uid });
    const medicines = await Medicine.find({ vendor_id: vendor._id })
      .populate("vendor_id")
      .populate("category");
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All medicines",
      data: medicines,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Medicines not found",
      data: {},
      error: error.message,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const { uid } = req.body;
    const { id: medicineId } = req.params;
    const vendor = await User.findOne({ uid });
    const medicine = await Medicine.findOne({ _id: medicineId });
    if (!medicine) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Medicine not found",
        data: {},
        error: "Medicine not found",
      });
    }
    if (medicine.vendor_id.toString() !== vendor._id.toString()) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
        data: {},
        error: "Unauthorized",
      });
    }
    await Medicine.deleteOne({ _id: medicineId });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Medicine deleted successfully",
      data: {},
      error: {},
    });
  }
  catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Medicine not deleted",
      data: {},
      error: error.message,
    });
  }
}

module.exports = {
  addMedicine,
  getAllMedicine,
  deleteMedicine,
};
