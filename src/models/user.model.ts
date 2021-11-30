import mongoose, { Schema, Model, Document } from "mongoose";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updateAt: Date;
  active: boolean;
  verifyToken: string;
}

interface UserDocument extends Document, IUser {
  setToken: () => string;
}

interface UserModel extends Model<UserDocument> {
  authentication: (email: string, password: string) => UserDocument;
}

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.authentication = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Email not found");
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password not match");
  }
  return user;
};

userSchema.methods.setToken = function () {
  const user = this;
  return sign({ _id: user._id }, PRIVATE_KEY, { expiresIn: "1h" });
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const password = user.password as string;
    user.password = await hash(password, 8);
  }
  next();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
