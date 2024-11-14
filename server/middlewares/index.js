const { SecretsConfig } = require("../configs");
const jwt = require("jsonwebtoken");

const createJWT = (req, res, next) => {
  const { uid } = req.body;
  const token = jwt.sign({ uid }, SecretsConfig.JWT_SECRET, {
    expiresIn: "365d",
  });
  req.body.token = token;
  next();
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, SecretsConfig.JWT_SECRET);
    req.body.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }
};

module.exports = {
  createJWT,
  verifyJWT,
};
