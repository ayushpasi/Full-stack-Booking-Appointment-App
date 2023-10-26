const { where } = require("sequelize");
const UserModel = require("../models/user.model");

//save data to database
const save = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;

    const data = await UserModel.create({
      name: name,
      email: email,
      mobile: mobile,
    });

    res.status(201).json({
      newUser: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

//fetch all users
const fetch = async (req, res, next) => {
  try {
    const user = await UserModel.findAll();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err,
    });
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Use 'const' to declare userId
    if (!userId) {
      return res.status(400).json({
        error: "Id missing", // Changed 'err' to 'error'
      });
    }

    const result = await UserModel.destroy({
      where: {
        id: userId,
      },
    });

    if (result === 1) {
      return res.status(200).json({
        success: "User deleted successfully", // Changed 'succes' to 'success'
      });
    } else {
      return res.status(404).json({
        error: "User not found", // Notify if the user with the given ID was not found
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error in deleting",
    });
  }
};

module.exports = { save, fetch, deleteUser };
