const { Mongoose } = require("../configs");

const medicineSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  category: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  vendor_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "available",
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Medicine = Mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
