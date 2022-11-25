const mailgun = require("mailgun-js");

const sendEmail = (email, subject, message) => {

  console.log(email);

  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
  const data = {
    from: 'tatianibassani@gmail.com',
    to: email,
    subject: subject,
    text: message
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = { sendEmail };
