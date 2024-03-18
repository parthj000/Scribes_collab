import { userMetaDataBase } from "./schemas.js";
async function findUser(sessid) {
  const user = await userMetaDataBase.find({ sessId: sessid });

  const data = {
    photo: user[0].profilePhoto,
    svg: false,
    name: user[0].name,
  };
  if (user[0].blogsId.length == 0) {
    data.svg = true;
  }
  return data;
}
export { findUser };
