import mongoose from "mongoose";
import { composeMongoose } from "graphql-compose-mongoose";
import { Schema } from "mongoose";

const CustomerSchema = new Schema({
  firstName: String,
  lastName: String,
  stamps: Number,
  visits: Number,
  lastVisit: String
});

const ProviderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  isHead: Boolean
});

const CandidateProviderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
})

const LocalSchema = new Schema({
  address: {
    address1: String,
    address2: String,
    city: String,
    zip: String
  },
  linkedProviders: [ProviderSchema],
  candidateProviders: [CandidateProviderSchema],
  linkedUsers: [CustomerSchema]
});

const OrgSchema = new Schema({
  name: String,
  locals: [LocalSchema],
  type: String,
  numOfStamps: Number,
  head: String
});

const customizationOptions = {};

export const Org = mongoose.model('Org', OrgSchema);
export const OrgTC = composeMongoose(Org, customizationOptions);

const Local = mongoose.model('Local', LocalSchema);
export const LocalTC = composeMongoose(Local, customizationOptions);

export const Customer = mongoose.model('Customer', CustomerSchema);
export const CustomerTC = composeMongoose(Customer, customizationOptions);
