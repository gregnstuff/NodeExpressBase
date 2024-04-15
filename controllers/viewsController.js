const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log In",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your Account",
  });
};

exports.updateUserDate = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render("account", {
    title: "Your Account",
    user: updatedUser,
  });
});
