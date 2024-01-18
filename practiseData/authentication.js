import { people } from "../data/registered.js";
import bcrypt from "bcrypt";

async function authenticate(req, res, next) {
  try {
    if (people.hasOwnProperty(`${req.body.name}`)) {
      const key = req.body.name;
      const result = await bcrypt.compare(
        req.body.password,
        people[key].password
      );
      console.log(result);

      if (!result) throw new Error("password incorrect");
      return next();
    }
    throw new Error("no user found");
  } catch (error) {
    return res.send(error.message);
  }
}
export { authenticate };
