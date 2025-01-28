import express from "express";
import cockieParser from "cookie-parser";
import pkg from "express-handlebars";
import path from "path";
import "dotenv/config";

import { connectDB } from "./data/mongoose.js";

import { router } from "./routes/routes.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { jwtauth } from "./data/jwtauth.js";

const direcName = dirname(import.meta.url);
const filePath = fileURLToPath(direcName);

const app = express();

connectDB();

app.use(
  "/files/static/app/raw/kapa65568/server/kpo576455zz545",
  express.static(path.resolve("./views/static"))
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.text());
app.use(express.json());

const { engine } = pkg;

// app.use(express.json());

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  engine({
    helpers: {
      concate: function (arg1, arg2) {
        return arg1 + arg2;
      },
      convert: function (arg) {
        return "" + arg + "";
      },
    },
  })
);

app.use("/", router);

app.use((req, res, next) => {
  if (req.renderCode == 1)
    return res.render("error", {
      layout: "active",
      errorCode: 400,
    });
  return res.render("error", {
    errorCode: 400,
  });
});
// app.get("/cookie", (req, res) => {
//   // res.setHeader("set-cookie", "foo=key");
// req.coockies.particularcoockie
//   res.cookie("name", "parth", {
//     //     httpOnly: false, //client can access the cookie through console
//     //     secure:true https only
//     // domain:example.com cookie accesible to this domain only and its subdomain
//   });

//   res.cookie("key", "value", {
//     expires: new Date("25 JUNE 2008"),
//     httpOnly: false,
//   });
//   res.send("coockie set");
// });
// app.get("/clearcookie", (req, res) => {
//   res.clearCookie("foo");
//   res.send(req.cookies); //access all cookies available
// });

app.listen(3000, () => console.log("app running "));
