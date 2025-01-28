import jwt from "jsonwebtoken";

async function jwtauth(req, res, next) {
  try {
    const Cookie = req.cookies;
    if (Cookie.AuthToken == null)
      throw new Error("Something Went wrong , please login again");
    const result = await jwt.verify(Cookie.AuthToken, process.env.SECRETKEY);
    console.log("---------------------jwt checkpoint cleared");
    next();
  } catch (error) {
    console.log(error.message);
    res.render("error", {
      errCode: 500,
    });
  }
}

// const checkToken = async (req, res, next) => {
//   try {
//     const Cookie = req.cookies.AuthToken;
//     console.log("hii");

//     if (Cookie != null) {
//       const result = jwt.verify(Cookie, SECRETKEY);
//       if (result) {
//         throw new Error("you are already logged in");
//       }
//     }
//     next();
//   } catch (err) {
//     res.clearCookie("AuthToken");
//     console.log(err);
//     return res.send(err);
//   }
// };

export { jwtauth };
