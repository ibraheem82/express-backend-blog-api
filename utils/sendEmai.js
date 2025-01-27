const {gmail_user, gmail_password} = require("../config/kyes")
const nodemailer = require("nodemailer");


const sendMail = async ({ emailTo, subject, code, content }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmail_user, // ur own mail
        pass: gmail_password,
      },
    });

    const message = {
      to: emailTo,
      subject,
      html: `
        <div>
          <h3>Use this below code to ${content}</h3>
          <p><strong>Code: </strong> ${code}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(message);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;