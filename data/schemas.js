import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  password: {
    required: true,
    type: String,
  },
  rawPassword: String,
  sessId: String,
});

const mainDataSchema = mongoose.Schema({
  name: String,
  profilePhoto: {
    default:
      "http://res.cloudinary.com/dalll4udd/image/upload/v1710588884/ipoktcuzeh7iq9eitau6.png",
    type: String,
  },
  blogsId: {
    type: [String],
    default: [],
  },
  followers: [Object],
  following: [Object],
  bookmark: [String],
  sessId: {
    type: String,
    required: true,
    default: " ",
  },
  baseUrl: {
    type: String,
  },
  permission: Boolean,
});
const newSch = mongoose.Schema({
  content: {
    default: "",
    type: String,
  },
  User: {
    default: "",
    type: String,
  },
});
const blogListSchema = mongoose.Schema({
  title: String,
  blogPhoto: {
    default:
      "https://res.cloudinary.com/dalll4udd/image/upload/v1710532412/emj6pzwq6sawanrgcvdt.png",
    type: String,
  },
  author: String,
  authorPhoto: {
    type: String,
    default:
      "http://res.cloudinary.com/dalll4udd/image/upload/v1710588884/ipoktcuzeh7iq9eitau6.png",
  },
  date: String,
  content: String,
  slug: String,
  comments: {
    default: [],
    type: [Object],
  },
  Id: String,
});

const editorsChoice = mongoose.Schema({
  blogOrderId: [String],
  date: String,
});
const adminChoice = mongoose.model("editorsChoice", editorsChoice);

const basicRegisterModel = mongoose.model("activeUserData", userSchema);
const blogDatabase = mongoose.model("BLOGDATABASE", blogListSchema);
const userMetaDataBase = mongoose.model("USERMETADATABASE", mainDataSchema);
export { basicRegisterModel, userMetaDataBase, blogDatabase, adminChoice };
