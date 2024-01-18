import jwt from "jsonwebtoken";
import { SECRETKEY } from "./privatekeys.js";
async function checkCookie(req, res, next) {
  try {
    const cookie = req.cookies.AuthToken;
    // console.log(cookie);

    if (cookie != null) {
      const result = await jwt.verify(cookie, SECRETKEY);

      if (result) {
        req.renderCode = 1;
        req.message = "Active user";

        return next();
      }
      req.message = "jwt is mallformed";
      req.renderCode = 0;
      req.followup = false; //to skip middlewares
      return next();
    }

    throw new Error("This is passive User");
  } catch (err) {
    req.message = err.message;
    req.renderCode = 0;
    req.followup = false;
    return next();
  }
}
export { checkCookie };
