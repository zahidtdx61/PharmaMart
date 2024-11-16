const { StatusCodes } = require("http-status-codes");
const Category = require("../models/category");
const Medicine = require("../models/medicine");

const getAll = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All medicines",
      data: medicines,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Medicines not found",
      data: {},
      error: error.message,
    });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const medicine = await Medicine.findById(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Medicine found",
      data: medicine,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Medicine not found",
      data: {},
      error: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "All categories",
      data: allCategory,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Categories not found",
      data: {},
      error: error.message,
    });
  }
};

const addCategory = async (req, res) => {
  const category = req.body;
  try {
    const newCategory = await Category.create(category);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Category added successfully",
      data: newCategory,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Category not added",
      data: {},
      error: error.message,
    });
  }
};

const getByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const medicines = await Medicine.find({ category: id });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Medicines found",
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

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Category found",
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

module.exports = {
  getAll,
  getOne,
  getAllCategory,
  addCategory,
  getByCategory,
  getCategory,
};
