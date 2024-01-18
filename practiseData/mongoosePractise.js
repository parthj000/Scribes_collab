import mongoose from "mongoose";
import { userModel } from "./practiseSchemas.js";
connectMongo();
const parth = new userModel({
  name: "parth",
  password: "123456",
});
const manthan = new userModel({
  name: "ap",
  password: "manthan123",
});
manthan.name = "jsns";

await parth.save();
await manthan.save();

async function tues() {
  const toDel = await userModel.find({ password: "manthan123" });

  console.log(toDel);
}
tues();

async function connectMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017");
  } catch (err) {
    return console.log(err.message);
  }
  console.log("connected to mongoose succefully");
}
