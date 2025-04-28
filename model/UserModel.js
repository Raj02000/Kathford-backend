const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuidv1");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
      //  0 is user and 1 is admin
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    salt: String,
  },
  { timestamps: true }
);
UserSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptedPassword(this._password);
});
UserSchema.methods = {
  encryptedPassword: function (password) {
    if (password == null) {
      return null;
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch {
      return null;
    }
  },
  authenticate: function (password) {
    return this.hashed_password == this.encryptedPassword(password);
  },
};
module.exports = mongoose.model("User", UserSchema);
