const express = require("express");
const { MedicineController } = require("../../controllers");
const router = express.Router();

router.get("/get/:id", MedicineController.getOne);
router.get("/get-all", MedicineController.getAll);
router.get("/get-by-category/:id", MedicineController.getByCategory);
router.get("/category", MedicineController.getAllCategory);
router.post("/add-category", MedicineController.addCategory);

module.exports = router;
