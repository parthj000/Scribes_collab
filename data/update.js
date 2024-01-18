import mongoose from "mongoose";
import {
  basicRegisterModel,
  blogDatabase,
  userMetaDataBase,
} from "./schemas.js";
import crypto from "crypto";

async function editBlog(req, res, next) {
  if (req.followup == false) return next();

  const slug = req.params.slug;
  // console.log(slug);
  const blogs = await blogDatabase.find({ slug: slug });
  const blog = blogs[0];

  const content = blog.content;
  const title = blog.title;

  req.title = title;
  req.content = content;

  next();
}
async function userAction(req, res, next) {
  // if (req.followup == false) return next();

  try {
    const slug = req.params.slug;
    const blogs = await blogDatabase.find({ slug: slug });

    console.log(
      req.body.action,
      "---------------------------------tried action"
    );

    const blog = blogs[0]; //this is array thats why

    if (req.body.action == "update") {
      blog.title = req.body.newTitle;
      blog.content = req.body.newContent;
      blog.save();
      // console.log(blog);
      return console.log(
        blog.Id,
        "blog id ---------------------------update succesful"
      );
    } else if (req.body.action == "delete") {
      const id = blog.Id;

      var user = await userMetaDataBase.find({
        sessId: req.decodedData.sessId,
      });
      user = user[0];

      console.log(user);

      const blogs = user.blogsId;
      const newblogId = [];
      for (let i = 0; i < blogs.length; i++) {
        if (blogs[i] != id) {
          newblogId.push(blogs[i]);
        }
      }
      console.log(newblogId);
      user.blogsId = newblogId;
      user.save();

      const dl = await blogDatabase.deleteOne({ slug: slug });

      return res.render("home", {
        layout: "active",
      });
    } else if (req.body.action == "logout") {
      res.clearCookie("AuthToken");
      const random = crypto.randomBytes(4).toString("hex");
      var newsessId = req.decodedData.sessId;
      console.log(newsessId);
      newsessId = random;

      const userarray = await userMetaDataBase.find({
        sessId: req.decodedData.sessId,
      });
      const user = userarray[0];
      user.sessId = newsessId;
      console.log(user);
      await user.save();

      const activeUserArray = await basicRegisterModel.find({
        sessId: req.decodedData.sessId,
      });
      const activeUser = activeUserArray[0];
      activeUser.sessId = newsessId;
      await activeUser.save();

      console.log("------------------------------------->", activeUser);
      console.log("------------------------------------->", activeUser);
      return next();
    }

    //html value or textarea ko yaad rakhiyo
  } catch (err) {
    console.log(err);
  }
}

export { editBlog, userAction };
