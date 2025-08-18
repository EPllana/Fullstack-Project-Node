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
  const token = req.query;
  console.log("Token nga URL:", token);

  
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const verifyUrl = `http://localhost:3000/api/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verifikoni Email-in Tuaj",
    text: `Ju lutem klikoni në këtë lidhje për të verifikuar email-in tuaj: ${verifyUrl}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Gabim gjatë dërgimit të email-it", error);
  }
};
