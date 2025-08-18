import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Mund të përdorësh cilindo shërbim të email-it
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerifyEmail = async (email, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '4h' }); // krijo token që skadon pas 1 ore

  const verifyUrl = `http://localhost:3000/api/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Travel APP" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verifikoni Email-in Tuaj",
    html: `<p>Hello ${name}, please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Gabim gjatë dërgimit të email-it", error);
  }
};
