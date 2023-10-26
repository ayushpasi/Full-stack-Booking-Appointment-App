const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/save", userController.save);
router.get("/fetch", userController.fetch);
router.delete("/delete/:id", userController.deleteUser);
module.exports = router;
