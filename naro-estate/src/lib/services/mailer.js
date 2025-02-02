// mailer.js
const nodemailer = require('nodemailer');
import { EMAIL_TYPES, TEMPLATES } from '../constants';

var transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USERID,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Generic sendMail function that uses predefined templates
const sendMail = async (to, subject, emailType, dynamicData = {}) => {
  try {
    // Set up email options dynamically based on the email type
    let mailOptions = {
      from: process.env.EMAIL, // sender address
      to, // recipient address
      subject, // subject line
    };

    // Check email type and set body accordingly
    let emailContent = '';

    switch (emailType) {
      case EMAIL_TYPES.WELCOME_USER:
        emailContent = TEMPLATES.WELCOME_USER(dynamicData.username,dynamicData.verificationLink);
        break;
      case EMAIL_TYPES.PASSWORD_RESET:
        emailContent = TEMPLATES.PASSWORD_RESET(dynamicData.username,dynamicData.resetLink);
        break;
      case EMAIL_TYPES.FORGOT_PASSWORD:
        emailContent = TEMPLATES.FORGOT_PASSWORD(dynamicData.username);
        break;
      case EMAIL_TYPES.RESET_PASSWORD:
        emailContent = TEMPLATES.RESET_PASSWORD(dynamicData.username);
        break;
      default:
        throw new Error('Unknown email type');
    }

    // Set HTML body for the email
    mailOptions.html = emailContent;

    // Send the email using the transporter
    const info = await transport.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw new Error('Error sending email');
  }
};

export default sendMail;

// Example for function call of sendEmail() function

// sendMail(
//     'newuser@example.com',         // Recipient email address
//     'Welcome to Our App!',         // Subject of the email
//     EMAIL_TYPES.WELCOME_USER,      // Email type (using constant)
//     { username: 'NewUser123' }     // Dynamic data (username to personalize the email)
//   );
  