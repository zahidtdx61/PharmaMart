const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Payment = require("../models/payment");
const { Mongoose, SecretsConfig } = require("../configs");

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
  const { medicines, buyer_id, totalAmount, transaction_id, uid } = req.body;

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

    const payment = await Payment.create({
      transaction_id,
      medicines,
      buyer_id: user._id,
      totalAmount,
    });

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
