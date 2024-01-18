import bcrypt from "bcrypt";
import { people } from "../data/registered.js";

import fs from "fs";

var key;
var newUser, data;

const register = async function Hash(req, res, next) {
  const salt = await bcrypt.genSalt(15); //it can have time parameter for stating the time to take to make the salt. more time more strong will be the salt..

  const hashedPassword = await bcrypt.hash(`${req.body.password}`, salt);
  console.log("stary", people);
  newUser = {
    username: req.body.name,
    password: hashedPassword,
  };
  console.log(req.body);
  key = req.body.name;
  console.log(key);
  people[key] = newUser;
  console.log("middle", people);
  data =
    "const people = " +
    JSON.stringify(people, null, 2)
      .replace(/"(\w+)"\s*:/g, "$1:")
      .replace(/"/g, "'") +
    "\n export {people}";
  console.log("last", people);
  write();
  next();
};

function write(key, newUser) {
  fs.writeFileSync("./data/registered.js", data, (error) => {
    if (error) {
      console.log("error writing the file");
      return console.log(error);
    }
    console.log("written succesfully");
  });
}

export { register };
