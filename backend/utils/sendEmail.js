// utils/sendEmail.js
const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const msg = {
    to: options.email,
    from: 'expensemate@protonmail.com', // Use your verified SendGrid sender email
    subject: options.subject,
    text: options.message,
  };

  await sgMail.send(msg);
};

module.exports = sendEmail;

