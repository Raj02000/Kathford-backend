const express = require("express");
const {
  register,
  verifyuser,
  resendverification,
  forgetPassword,
  changePassword,
} = require("../controller/UserController");

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verifyuser);
router.post("/resend", resendverification);
router.post("/forgetpassword", forgetPassword);
router.post("/forgetpassword/:id", changePassword);

module.exports = router;
