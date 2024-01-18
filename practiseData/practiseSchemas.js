import mongoose from "mongoose";
const info = mongoose.Schema({
  username: String,
  ids: [Number],
});
const userDetails = mongoose.Schema({
  name: {
    default: "",
    type: String,
  },
  password: String,
  date: Date,
});
const userModel = mongoose.model("userDetailsModel", userDetails);
export { userModel };

//there are different types of schemas which we can use in mongoose
// date:Date//it will accept date as value
// there are other options through which we can have as default param or not
// example
// date:{
//     type:mongoose.SchemaType.ObjectId//can take any value like id given.
//     default:()=>new date(),//each time the default date
//     reuired:true// by deafult the required is set to false
//     uppercase:true,
//     lowercase:true,
// immutable: true; //we cant change the type even by accesing the element of model example parth.name = deepak

// }
