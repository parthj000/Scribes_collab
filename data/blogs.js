import mongoose from "mongoose";
import { blogDatabase, userMetaDataBase, adminChoice } from "./schemas.js";
function coockieCorec(req, res, next) {
  req.followup = true;
  next();
}
async function findBlog(req, res, next) {
  if (req.followup == false) {
    return next();
  }
  var blogList = await blogDatabase.find({}).lean();
  const blogListreverse = blogList.reverse(); //helps to reverse the blogs //helps in sorting
  req.newblogList = blogListreverse;

  const adminChoiceArray = await adminChoice.find({});
  const adminChoiceB = adminChoiceArray[0];
  console.log(adminChoiceB);
  const slug = adminChoiceB.blogOrderId;
  const editorsChoiceBlogs = [];
  for (let key of slug) {
    const findi = await blogDatabase.find({ slug: key }).lean();
    editorsChoiceBlogs.push(findi[0]);
  }
  console.log(editorsChoiceBlogs, "--------------------------------ed");

  req.editorsChoices = editorsChoiceBlogs;

  next();
}

async function decodeToken(req, res, next) {
  try {
    if (req.followup == false) return next();
    const AuthToken = req.cookies.AuthToken;
    const data = AuthToken.split(".");
    const buffer = Buffer.from(data[1], "base64");
    const decodeString = buffer.toString("utf8");
    const decodedData = JSON.parse(decodeString);
    req.decodedData = decodedData;

    console.log("decoded data------->", decodedData);
    next();
  } catch (err) {
    console.log(err);
  }
}

async function userBlogs(req, res, next) {
  //only use method after decode TOken as it is linked to decodeToken
  try {
    if (req.followup == false) return next();

    const sessId = req.decodedData.sessId;
    const user = await userMetaDataBase.find({ sessId: sessId });
    console.log(user);
    const blogsId = await user[0].blogsId;

    var blogs = [];
    console.log(blogsId);
    for (let key of blogsId) {
      console.log(key);
      const blog = await blogDatabase.find({ Id: key }).lean();
      console.log(blog[0].Id, "-----------------------898");
      blogs.push(blog[0]);
      console.log(blogs);
    }

    req.newblogs = blogs.reverse();
    next();
  } catch (err) {
    req.renderCode = 0;
    req.message = err.message;
    next();
  }
}

export { findBlog, userBlogs, decodeToken, coockieCorec };
