const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    resetToken: String,
    tokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

const moment = require("moment-timezone");
userSchema.pre("save", function (next) {
  const now = moment().tz("Asia/Yangon").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

userSchema.pre("update", function (next) {
  const now = moment().tz("Asia/Yangon").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  this.updatedAt = now;
  next();
});

const userModel = model("User", userSchema);

module.exports = userModel;
