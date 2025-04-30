const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});
module.exports = mongoose.model("Token", TokenSchema);
