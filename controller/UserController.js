const User = require("../model/UserModel");
const crypto = require("crypto");
const Token = require("../model/TokenModel");
const sendEmail = require("../sendEmail");
let jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // destructuring
  const { name, email, password } = req.body;
  //destructure navako ma
  // const user = User.findOne({ email: req.body.email });
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "Email Already exist" });
  }
  let register = new User({
    name: name,
    email: email,
    password: password,
  });
  register = await register.save();
  if (!register) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    user: register._id,
  });
  token = await token.save();
  if (!token) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  // res.status(200).json(token);
  const url = `localhost:5000/user/verify/${token.token}`;
  sendEmail({
    from: "noreply@gmail.com",
    to: req.body.email,
    subject: "Verification Mail",
    text: url,
    html: "<a><button>Click to verify</button></a>",
  });
  res.status(200).json(register);
};

exports.verifyuser = async (req, res) => {
  let token = await Token.findOne({ token: req.params.token });
  if (!token) {
    return res.status(400).json({ message: "Invalid Token or Token not" });
  }
  let verify = await User.findOne(token.user);
  if (!verify) return res.status(400).json({ message: "User Not Found" });
  if (verify.isVerified) {
    return res.status(200).json({ message: "User already verified" });
  }
  verify.isVerified = true;
  verify = await verify.save();
  if (!verify) return res.status(400).json({ message: "Something went wrong" });
  return res.status(200).json({ message: "User verified", user: verify });
};
exports.resendverification = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    user: user._id,
  });
  token = await token.save();
  if (!token) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  // res.status(200).json(token);
  const url = `localhost:5000/user/verify/${token.token}`;
  sendEmail({
    from: "noreply@gmail.com",
    to: req.body.email,
    subject: "Resend Verification Mail",
    text: url,
    html: "<a><button>Click to verify</button></a>",
  });
  res.status(200).json(user);
};
exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "User Not found" });
  }
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    user: user._id,
  });
  token = await token.save();
  if (!token) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  // res.status(200).json(token);
  const url = `localhost:5000/user/forgetpassword/${token.token}`;
  sendEmail({
    from: "noreply@gmail.com",
    to: email,
    subject: "Forget Password Mail",
    text: url,
    html: "<a><button>Click to verify</button></a>",
  });
  return res.status(200).json({ user });
};
exports.changePassword = async (req, res) => {
  const { id } = req.params;
  let token = await Token.findOne({ token: id });
  if (!token) {
    return res.status(400).json({ message: "Invalid Token" });
  }
  console.log(token);

  let user = await User.findOne(token.user);
  if (!user) {
    return res.status(400).json({ message: "Invalid User" });
  }
  user.password = req.body.password;
  user = await user.save();
  if (!user) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Password changed", user });
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.authenticate(password)) {
    return res.status(400).json({ message: "Password doesnot match" });
  }
  if (!user.isVerified) {
    return res.status(400).json({ message: "Please Verify your account " });
  }
  let token = jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    "Raj",
    { expiresIn: "1h" }
  );
  return res
    .status(200)
    .json({ token: token, user: user, message: "Login Success" });
};
