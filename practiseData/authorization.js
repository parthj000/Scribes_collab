import jwt from "jsonwebtoken";
const secretKey = "pibnnb";
const user = {
  author: "parth",
};
const h = jwt.sign(user, secretKey);
console.log(h);
