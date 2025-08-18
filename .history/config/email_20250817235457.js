import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Krijimi i transporter-it me Gmail si shërbim dhe kredencialet nga variablat e mjedisit
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Funksioni për të dërguar email mirëseardhjeje
export const sendWelcomeEmail = async (toEmail, name) => {
  try {
    const info = await transporter.sendMail({
      from: `"Travel APP" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Welcome To Our Travel App",
      html: `
        <h2>Hi, ${name}</h2>
        <p>Welcome aboard!</p>
        <p>Let us know if you need anything.</p>
        <br>
        <strong> Travel App Team</strong> `,
    });

    console.log("✅ Email sent: " + info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message); // Shto log të qartë
  }
};

import nodemailer from "nodemailer";

export const sendVerificationEmail = async ({ email, name, verificationToken }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  // Përdoruesi i Gmail-it
      pass: process.env.EMAIL_PASS,  // Fjalëkalimi për Gmail
    },
  });

  const verificationLink = `http://localhost:3000/api/users/verify-email?token=${verificationToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,  // Email-i që po dërgon
    to: email,  // Email-i i destinacionit
    subject: "Verify your email",
    html: `<p>Hello ${name}, please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
  });
};
