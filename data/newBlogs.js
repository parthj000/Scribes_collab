import mongoose from "mongoose";
import { blogDatabase, userMetaDataBase } from "./schemas.js";
import crypto from "crypto";
// const random = crypto.randomBytes(5).toString("hex");//ky horaha tha ki yeh run nahi ho rha tha jab har bar function call hoga kyunki yeh function me nahi aarha hain isliye sabko id same deraha tha

async function addBlog(req, res, next) {
  try {
    const sessId = req.decodedData.sessId;
    const random = crypto.randomBytes(5).toString("hex");

    const newBlog = await new blogDatabase({
      title: req.body.title,
      content: req.body.content,
      slug: req.body.slug + random,
      Id: random,
    });
    newBlog.save();
    console.log("------------------newblog");

    const user = await userMetaDataBase.find({ sessId: sessId });
    const data = user[0].blogsId;
    console.log(data);

    data.push(random);
    user[0].save();
    console.log("---------------------------------->userupdated");
    next();
  } catch (err) {
    return res.render("error");
  }

  //blog id save to the user
}
export { addBlog };
