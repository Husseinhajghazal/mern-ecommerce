const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "YOUR_EMAIL",
      pass: "YOUR_PASSWORD",
    },
  });

  const mailOptions = {
    from: "YOUR_EMAIL",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
