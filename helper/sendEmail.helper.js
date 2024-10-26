const nodemailer = require('nodemailer');
module.exports.sendEmail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email_User,
      pass: process.env.Pass
    }
  });
  const mailOptions = {
    from: process.env.Email_User,
    to: email,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}