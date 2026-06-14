import nodeMailer from 'nodemailer';

const transport = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  pool: true, //  keep connection alive
});
export const mailSender = async (email, title, body) => {
  try {
    let info = await transport.sendMail({
      from: `Productr Team || Ecommerce department ${process.env.MAIL_USER} .`,
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error('Error occur in mailSender function', error);
    throw error;
  }
};
