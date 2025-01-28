import mongoose from "mongoose";
import { userMetaDataBase, blogDatabase } from "./schemas.js";
async function admin(req, res, next) {
  var post = await blogDatabase.find({}).lean();
  post = post.reverse();
  const author = await console.log(post);
  return res.render("admin", {
    blogs: post,
  });
  next();
}
export { admin };
