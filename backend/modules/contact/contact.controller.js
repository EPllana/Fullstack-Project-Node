import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

export const sendContactEmail = async (req, res) => {
  const { name, surname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: email, 
    to: 'pllanashefki76@gmail.com', 
    subject: `Message From ${name} ${surname}`,
    text: `Name: ${name} ${surname}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message Sent Succefully!');
  } catch (error) {
    res.status(500).send('Error Sending Message.');
  }
};
