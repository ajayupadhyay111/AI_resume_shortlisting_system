
const User = require("../models/user");

const CheckUserIsEligible = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (user.attemptCount >= 3) {
    return res.status(404).json({ message: "You have reached the maximum limit of attempts for free account" });
  }
  next();
};

module.exports = CheckUserIsEligible;
