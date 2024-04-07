import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD, //App password for gmail account
  },
});
function makeObject(receiver, url) {
  return {
    from: {
      name: "MyBlogs",
      address: process.env.USER,
    },
    to: receiver,
    subject: process.env.AUTHOR + "has just invited to collab", // Subject line
    text: "Please click on this link" + url, // plain text body
    html:
      "<b>Please click on this link </b><br><b>Please dont reply to this mail</b>" +
      url, // html body
  };
}

const sendMail = async (transporteer, mailOptions) => {
  try {
    await transporteer.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);
  }
};

function sendGmail(param, param2) {
  sendMail(transporter, makeObject(param, param2));
}
// sendGmail("jparth582@gmail.com");
export { sendGmail };
