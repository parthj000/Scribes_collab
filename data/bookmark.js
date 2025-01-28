import { blogDatabase, userMetaDataBase } from "./schemas.js";

async function bookmark(req, res) {
  let blog = await blogDatabase.findOne({
    title: req.body.title,
    author: req.body.author,
  });
  const user = await kap(req);
  for(let key of user.bookmark){
    if(key===blog.Id){
      return;
    }
  }
  await user.bookmark.push(blog.Id);
  await user.save();
  console.log(user, "user");
}
async function kap(req) {
  const user = await userMetaDataBase.findOne({
    sessId: req.decodedData.sessId,
  });

  return user;
}
async function showBookmarks(req, res) {
  const user = await userMetaDataBase.findOne({
    sessId: req.decodedData.sessId,
  });
  const ids = await user.bookmark;
  const newBlogs = [];
  console.log(ids);
  for (let key of ids) {
    const blogs = await blogDatabase.findOne({ Id: key }).lean();
    newBlogs.push(blogs);
    console.log(newBlogs);
  }
  return newBlogs;
}

export { bookmark, showBookmarks };
