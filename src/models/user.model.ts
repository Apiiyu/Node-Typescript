import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { boolean } from "zod";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
} 

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email is required!'],
    unique: true
  },
  name: {
    type: String,
    require: [true, 'Name is required!']
  },
  password: {
    type: String,
    require: [true, 'Password is required!']
  }
}, {
  timestamps: true
})

UserSchema  .pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((_e) => false);
};


const UserModel = mongoose.model("User", UserSchema)

export default UserModel