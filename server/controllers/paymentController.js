const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Payment = require("../models/payment");
const { Mongoose, SecretsConfig } = require("../configs");
const Medicine = require("../models/medicine");

const stripe = require("stripe")(SecretsConfig.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { price } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Payment intent created!",
    data: {
      clientSecret: paymentIntent.client_secret,
    },
    error: {},
  });
};

const completePayment = async (req, res) => {
  const { medicines, totalAmount, transaction_id, uid } = req.body;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
        data: {},
        error: {},
      });
    }

    let medicineDetails = [];

    for (let medicine of medicines) {
      const { id, quantity } = medicine;
      const updatedMedicine = await Medicine.findByIdAndUpdate(id, {
        $inc: { quantity: -quantity },
      });

      if (!updatedMedicine) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Medicine not found",
          data: {},
          error: {},
        });
      }

      if (updatedMedicine.quantity <= 0) {
        updatedMedicine.status = "out of stock";
      }

      medicineDetails.push({
        name: updatedMedicine.name,
        quantity,
        pricePerUnit: updatedMedicine.pricePerUnit,
        totalPrice: quantity * updatedMedicine.pricePerUnit,
        medicine_id: updatedMedicine._id,
        vendor_id: updatedMedicine.vendor_id,
        buyer_id: user._id,
        transaction_id,
      });

      await updatedMedicine.save();
    }

    const payment = await Payment.create({
      transaction_id,
      medicines,
      buyer_id: user._id,
      totalAmount,
    });

    await Mongoose.connection
      .collection("singlepayments")
      .insertMany(medicineDetails);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Payment completed successfully",
      data: payment,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Payment not completed",
      data: {},
      error: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
  completePayment,
};
