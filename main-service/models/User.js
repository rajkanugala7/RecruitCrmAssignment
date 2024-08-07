const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
    },
    user_name: {
        type: String,
        required: [true, "Your userrname is required"],
        unique:true
      },
  first_name: {
    type: String,
    required: [true, "Your First rname is required"],
    },
    last_name: {
        type: String,
        required: [true, "Your last rname is required"],
      },
  password_hash: {
    type: String,
      required: [true, "Your password is required"],
      api_key: {
          type: String,
          unique:true
    }
  }
});

userSchema.pre("save", async function () {
  this.password_hash = await bcrypt.hash(this.password_hash, 12);
});

module.exports = mongoose.model("User", userSchema);