import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { userMetaDataBase } from "./schemas.js";
import crypto from "crypto";

async function genToken(req, res, next) {
  try {
    const k = req.body.name;

    //transfer this data into metadatabase of user
    FIRSTTIMEMETADATA(k, req.sessId);

    next();
  } catch (e) {
    console.log(e);
  }
}

const FIRSTTIMEMETADATA = (k, sessId) => {
  const randomHex = crypto.randomBytes(4).toString("hex");
  const newData = new userMetaDataBase({
    name: k,
    sessId: sessId,
    permission: 1,
    baseUrl: `${k + randomHex + "75667km"}`,
  });
  newData.save();
  console.log("----------------succesfully data transfered to metadatabase");

  //send the cookie
};

export { genToken };
