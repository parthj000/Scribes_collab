import mongoose from "mongoose";
import {
  basicRegisterModel,
  userMetaDataBase,
  blogDatabase,
} from "./schemas.js";

async function generalUser(req, res, next) {
  const baseUrl = req.params.slug;
  const user = await userMetaDataBase.findOne({
    baseUrl: baseUrl,
  });
  if (user) {
    req.user = user;

    return next();
  }
  return res.render("error");
}

async function findGeneralBlog(req, res) {
  // const blogId = req.user.blogsId;
  // console.log(blogId);
  // const newBlog = [];
  // for (let key of blogId) {
  //   let blog = await blogDatabase.findOne({ Id: key });
  //   newBlog.push(blog);
  // }
  // console.log(newBlog);
  // return newBlog;
}

export { generalUser, findGeneralBlog };
