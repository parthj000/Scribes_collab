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
function makeObject(receiver, url, inviterName="kapa") {
  return {
    from: {
      name: "Scribes Team",
      address: process.env.USER,
    },
    to: receiver,
    subject: `📝 ${inviterName} Invited You to Collaborate on Scribes!`, // Personalized subject line
    text: `Hi there,\n\n${inviterName} has invited you to join a writing room on Scribes. Click the link below to join and start collaborating:\n\n${url}\n\nLooking forward to seeing your ideas!\n\nBest regards,\nThe Scribes Team`, // Plain text body
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <div style="background: #f4f4f4; padding: 20px; text-align: center; border-radius: 10px;">
          <h1 style="color: #2c3e50;">📝 You've Been Invited to Collaborate!</h1>
          <p style="font-size: 16px;">${inviterName} has invited you to join a writing room on <strong>Scribes</strong>. Click the button below to join and start collaborating:</p>
          <a href="${url}" style="display: inline-block; background: #3498db; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Join the Writing Room</a>
          <p style="font-size: 14px; color: #777;">If the button doesn't work, copy and paste this link into your browser:<br>${url}</p>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>&copy; 2023 Scribes. All rights reserved.</p>
        </div>
      </div>
    `, // HTML body
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

function sendGmail(param, param2,inviterName) {
  sendMail(transporter, makeObject(param, param2,inviterName));
}
// sendGmail("jparth582@gmail.com");
export { sendGmail };
