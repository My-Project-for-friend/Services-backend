const { changePasswordHandler, updateUserHandler } = require("../handler/user.handler");

const changePasswordController = async (req, res) => {
  try {
    const { success, data, error } = await changePasswordHandler(req);

    if (!success) {
      return res.status(401).json({ success: false, message: error });
    }

    if (!data) {
      return res.status(401).json({ success: false, message: "Error while changing password" });
    }

    return res.status(200).json({ success: true, message: "Password changed successfully", data });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { success, data, error } = await updateUserHandler(req);

    if (!success) {
      return res.status(401).json({ success: false, message: error });
    }

    if (!data) {
      return res.status(401).json({ success: false, message: "Error while updating user" });
    }

    return res.status(200).json({ success: true, message: "User details updated successfully", data });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { changePasswordController, updateUserController };
