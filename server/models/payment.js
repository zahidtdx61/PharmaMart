const { Mongoose } = require("../configs");

const paymentSchema = new Mongoose.Schema({
  medicine_id: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
  ],

  transaction_id: {
    type: String,
    required: true,
  },
  vendor_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
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

const Payment = Mongoose.model("Payment", paymentSchema);

module.exports = Payment;
