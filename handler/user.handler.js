const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");

const changePasswordHandler = async (req) => {
  const { password, newPassword } = req.body;
  const userId = req.user?._id;

  if (!userId) return { success: false, error: "Unauthenticated" };

  const user = await userModel.findOne({ _id: userId });
  if (!user) return { success: false, error: "User not found" };

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) return { success: false, error: "Old Password does not match" };

  user.password = newPassword; // MongoDB hook handles encryption
  await user.save();

  return { success: true, data: user };
};

const updateUserHandler = async (req) => {
  const { name, phone } = req.body;
  const userId = req.user?._id;

  if (!userId) return { success: false, error: "Unauthenticated" };

  const user = await userModel.findOne({ _id: userId });
  if (!user) return { success: false, error: "User not found" };

  user.name = name;
  user.phone = phone;
  await user.save();

  return { success: true, data: user };
};

module.exports = { changePasswordHandler, updateUserHandler };
