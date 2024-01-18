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
  blogsId: {
    type: [String],
  },
  sessId: {
    type: String,
    required: true,
    default: " ",
  },
  permission: Boolean,
});

const blogListSchema = mongoose.Schema({
  title: String,
  content: String,
  slug: String,
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
