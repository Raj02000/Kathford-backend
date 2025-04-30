const User = require("../model/UserModel");
const crypto = require("crypto");
const Token = require("../model/TokenModel");
const sendEmail = require("../sendEmail");

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
    to: email,
    subject: "Verification Mail",
    text: url,
    html: "<a><button>Click to verify</button></a>",
  });
  res.status(200).json(register);
};
