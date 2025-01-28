import mongoose from "mongoose";
import { blogDatabase, userMetaDataBase } from "./schemas.js";
import crypto from "crypto";
// const random = crypto.randomBytes(5).toString("hex");//ky horaha tha ki yeh run nahi ho rha tha jab har bar function call hoga kyunki yeh function me nahi aarha hain isliye sabko id same deraha tha

async function addBlog(req, res, next) {
  try {
    const sessId = req.decodedData.sessId;
    const random = crypto.randomBytes(5).toString("hex");
    const user = await userMetaDataBase.find({ sessId: sessId });
    console.log(user[0].profilePhoto);

    const newBlog = await new blogDatabase({
      title: req.body.title,
      author: await user[0].name,
      authorPhoto: await user[0].profilePhoto,
      blogPhoto: blogPhoto(req, res),
      date: date(),
      content: req.body.content,
      slug: req.body.slug + random,
      Id: random,
    });
    //

    //

    newBlog.save();
    console.log("------------------newblog");

    const data = user[0].blogsId;
    console.log(data);

    data.push(random);
    user[0].save();
    //

    //
    console.log("---------------------------------->userupdated");
    next();
  } catch (err) {
    console.log(err);
    return res.render("error");
  }

  //blog id save to the user
}

async function authorInfoFetch(req) {
  let tok = req.cookies.AuthToken;
  let s = tok.split(".")[1];
  let info = Buffer.from(s, "base64").toString("ascii");
  let sessId = info.sessId;

  try {
    const user = await userMetaDataBase.findOne({ sessId: sessId });
    return user;
  } catch (err) {
    console.log(err);
  }
}

function blogPhoto(req, res) {
  const encoded = req.cookies.add;
  const decoded = Buffer.from(encoded, "base64").toString("ascii");
  res.clearCookie("add");

  return decoded;
}

function date() {
  const date = new Date();
  const d = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return d;
}
export { addBlog };
