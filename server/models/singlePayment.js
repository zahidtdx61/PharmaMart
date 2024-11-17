const { Mongoose } = require("../configs");

const signlePaymentSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  totalPrice:{
    type: Number,
    required: true
  },
  medicine_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  vendor_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  buyer_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
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

const SinglePayment = Mongoose.model("SinglePayment", signlePaymentSchema);

module.exports = SinglePayment;
