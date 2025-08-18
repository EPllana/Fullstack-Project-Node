import { sendVerificationEmail }  from "../../"";
import dotenv from 'dotenv';
dotenv.config()
import nodemailer from "nodemailer";

export const sendVerificationEmail = async ({ email, name, verificationToken }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `http://localhost:3000/api/verify-email?token=${verificationToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `<p>Hello ${name}, please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
  });
};
