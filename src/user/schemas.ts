import mongoose from "mongoose";
import {composeMongoose} from "graphql-compose-mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  googleId: String,
  facebookId: String,
  linkedOrganizations: Array,
  isProvider: Boolean,
  linkedProviderOrganizations: Array,
  age: Number,
  email: String
});

const customizationOptions = {};

export const User = mongoose.model('User', UserSchema);

export const UserTC = composeMongoose(User, customizationOptions);
