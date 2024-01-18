import bcrypt from "bcrypt";

const hashedPassword = function createHash(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compare = function compareHash(raw, hash) {
  return bcrypt.compareSync(raw, hash);
};

export { hashedPassword, compare };
