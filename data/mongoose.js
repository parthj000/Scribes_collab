import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { hashedPassword, compare } from "./hashFun.js";
import { genToken } from "./authoriz.js";
import crypto from "crypto";

const dBURL = process.env.DBURL;

import { basicRegisterModel, userMetaDataBase } from "./schemas.js";

const random = crypto.randomBytes(4).toString("hex");

async function register(req, res, next) {
  try {
    const result = await basicRegisterModel.find({ name: req.body.name });
    if (result.length !== 0) {
      throw new Error("Error:user already exist");
    }
    const hashp = hashedPassword(req.body.password);

    const user = new basicRegisterModel({
      name: req.body.name,
      password: `${hashp}`,
      rawPassword: req.body.password,
      sessId: random,
    });
    console.log("-----------------------------new user registered");
    console.log(hashp);

    await user.save();

    //send sessId as request to next middleware
    req.sessId = user.sessId;

    next();
  } catch (err) {
    console.log(err.message);
    res.render("register", {
      errorMessage: "ERROR:THIS USERNAME ALREADY REGISTERED",
    });
  }
}

async function connectDB() {
  try {
    await mongoose.connect(dBURL);
  } catch (error) {
    console.log(error);
  }
  console.log("connected to database succesfully");
}

async function authenticate(req, res, next) {
  try {
    const result = await basicRegisterModel.find({ name: req.body.name });
    if (result.length === 0) throw new Error("ERROR:USER WAS NOT FOUND");
    for (let key of result) {
      const compareResult = compare(req.body.password, key.password);
      if (compareResult) {
        const user = await userMetaDataBase.find({ sessId: key.sessId });
        //generate token for user
        const arr = {
          name: user[0].name,
          sessId: user[0].sessId,
        };

        const AuthToken = await jwt.sign(arr, process.env.SECRETKEY);

        res.cookie("AuthToken", AuthToken);
        return next();
      }
    }
    throw new Error("Error:INVALID USERNAME OR PASSWORD");
  } catch (err) {
    res.render("login", {
      errMessage: err.message,
    });
  }
}

export { register, connectDB, authenticate };
