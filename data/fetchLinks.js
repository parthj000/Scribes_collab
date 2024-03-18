import { userMetaDataBase, blogDatabase } from "./schemas.js";
import mongoose from "mongoose";

const fetchLinks = async (req, url) => {
  const cookie = req.cookies.AuthToken;
  let encode = cookie.split(".")[1];
  let sessId = Buffer.from(encode, "base64").toString("utf-8");
  const decoded = JSON.parse(sessId);

  let user;
  try {
    user = await userMetaDataBase.find({ sessId: decoded.sessId });
    const User = user[0];
    User.profilePhoto = await url;
    let blogs = User.blogsId;
    User.save();

    //save blogs;
    for (let key of blogs) {
      console.log(key, "kkkkkkkkkkkkkey");
      let blog = await blogDatabase.find({ Id: key });
      console.log(blog, "blogggggg");
      blog[0].authorPhoto = await url;
      blog[0].save();
    }
    //
  } catch (err) {
    console.log(err);
  }
};

export { fetchLinks };
