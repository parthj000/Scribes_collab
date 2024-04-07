import mongoose from "mongoose";
import { blogDatabase } from "./schemas.js";

const commentinfo = async (req, res) => {
  let blog = await blogDatabase.findOne({
    title: req.body.title,
    author: req.body.author,
  });
  //this will find the blog
  const comments = blog.comments;
  comments.push({
    author: req.body.commentAuthor,
    comment: req.body.comment,
    title: req.body.title,
    photo: req.body.photo,
  });
  await blog.save();

  console.log(blog.comments, "========this is blog");
  req.comments = blog.comments;
};
export { commentinfo };
