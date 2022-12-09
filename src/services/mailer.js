import nodemailer from 'nodemailer';

export default async function (html, email) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.CLIENT_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER_EMAIL,
      to: email,
      subject: 'Weclcome to The React Unicode Learning Platform',
      html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      error
        ? console.log(`Mail ${error}`)
        : console.log(`Mail sent: ${info.response}`);
    });
  } catch (error) {
    console.log(`ERROR ${error}`);
  }
}
