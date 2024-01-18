import express from "express";
import { register } from "../data/mongoose.js";
import { checkCookie } from "../data/checkCookie.js";
import { editBlog, userAction } from "../data/update.js";
import { admin } from "../data/admin.js";
import { authenticate } from "../data/mongoose.js";
import { genToken } from "../data/authoriz.js";
import { blogDatabase, adminChoice } from "../data/schemas.js";

import {
  findBlog,
  decodeToken,
  userBlogs,
  coockieCorec,
} from "../data/blogs.js";
import { addBlog } from "../data/newBlogs.js";

const router = express.Router();

router.get("/", checkCookie, (req, res) => {
  if (req.renderCode == 1)
    return res.render("home", {
      layout: "active",
    });
  return res.render("home");
});

router.get("/about", checkCookie, (req, res) => {
  if (req.renderCode == 1)
    return res.render("about", {
      layout: "active",
    });
  return res.render("about");
});

router.get("/register", checkCookie, (req, res) => {
  if (req.renderCode == 1)
    return res.render("register", {
      layout: "active",
    });
  return res.render("register");
  //here actually we dont want to check cookies actually but to set the header
});

router.get("/blog", checkCookie, coockieCorec, findBlog, (req, res) => {
  if (req.renderCode != 1) {
    return res.render("allblogs", {
      blogs: req.newblogList,
      editorChoiceBlogs: req.editorsChoices,
    });
  }
  return res.render("allblogs", {
    layout: "active",
    blogs: req.newblogList,
    editorChoiceBlogs: req.editorsChoices,
  });
});

router.post("/register", register, genToken, (req, res) => {
  res.render("registered");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/auth", authenticate, (req, res) => {
  res.render("home", {
    layout: "active",
  });
});
router.get("/views/blog/:slug", checkCookie, async (req, res) => {
  // for (let obj of blogList) {
  //   for (let key in obj) {
  //     if (key == "slug" && obj[key] == req.params.slug) {
  //       res.render("blog", {
  //         content: obj.content,
  //         title: obj.title,
  //       });
  //     }
  //   }
  // }
  //

  var slug = req.params.slug;

  const blog = await blogDatabase.find({ slug: slug });
  // console.log(blog);

  if (req.renderCode == 1) {
    if (blog.length == 0) {
      return res.render("error", {
        layout: "active",
      });
    }

    return res.render("blog", {
      layout: "active",
      title: blog[0].title,
      content: blog[0].content,
    });
  }
  if (blog.length == 0) {
    return res.render("error", {});
  }

  return res.render("blog", {
    title: blog[0].title,
    content: blog[0].content,
  });
});
router.get(
  "/user/myaccount",
  checkCookie,
  decodeToken,
  userBlogs,
  (req, res) => {
    // authenticate using cookies and jwt authenticate
    // a dashboard containing all posts and to create post
    // logout option delete cookies
    // //addition me photo vagera lagana profile me
    // or bhi bahut kuch
    // var cr = [];
    // blogList.filter((elem) => {
    //   for (let key of people.parth.id) {
    //     if (elem.id == key) {
    //       cr.push(elem);
    //     }
    //   }
    //   return cr;
    // });
    // res.render("myaccount", {
    //   blog: cr,
    // });

    if (req.renderCode == 1) {
      console.log("----------------------------------------", req.message);
      console.log(req.newblogs);
      console.log("hh");
      return res.render("userblogs", {
        layout: "active",
        blogs: req.newblogs,
      });
    }

    console.log("-----------------------------", req.message);

    return res.render("error");
  }
);
router.get("/user/update/blog/:slug", checkCookie, editBlog, (req, res) => {
  if (req.renderCode == 1) {
    console.log("----------------------------------------", req.message);
    return res.render("update", {
      layout: "active",
      title: req.title,
      content: req.content,
    });
  }

  console.log("-----------------------------", req.message);

  return res.render("error");
});
router.post("/user/update/blog/:slug", userAction, (req, res) => {
  res.json({
    pp: "jj",
  });
});
router.post(
  "/user/delete/blog/:slug",
  checkCookie,
  decodeToken,
  userAction,
  (req, res) => {
    res.json({
      pp: "jj",
    });
  }
);
router.post(
  "/user/myaccount/logout",
  checkCookie,
  decodeToken,
  userAction,
  (req, res) => {
    res.json({
      pp: "jj",
    });
  }
);

router.get("/user/create", checkCookie, (req, res) => {
  if (req.renderCode == 1) {
    console.log("----------------------------------------", req.message);
    return res.render("create", {
      layout: "active",
    });
  }
  console.log("-----------------------------", req.message);

  return res.render("error");
});
router.post(
  "/user/create/post",
  checkCookie,
  decodeToken,
  addBlog,
  (req, res) => {
    if (req.renderCode == 1) {
      console.log("----------------------------------------", req.message);
      return res.render("home", {
        layout: "active",
      });
    }
    console.log("-----------------------------", req.message);

    return res.render("error");
  }
);
router.get("/admin", admin, (req, res) => {});
router.post("/admin/options", async (req, res) => {
  const slugs = req.body.blogs;
  await adminChoice.deleteMany({});
  const newChoice = new adminChoice({
    blogOrderId: slugs,
  });

  await newChoice.save();
  res.json({
    saved: "yes",
  });
});

export { router };
