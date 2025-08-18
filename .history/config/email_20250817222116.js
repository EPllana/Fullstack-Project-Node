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
        <p>Let us know if you need anything</p>
        <br>
        <strong> Travel App Team</strong> `,
    });

    console.log("Email sent: " + info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message); // shto log të qartë
  }
};

export const sendVerificationEmail = async (toEmail, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `"Travel APP" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Email Verification",
      html: `
        <h2>Welcome to Travel App!</h2>
        <p>Click <a href="http://localhost:5000/api/users/verify-email/${verificationToken}">here</a> to verify your email and complete the registration.</p>
        <br>
        <strong>Travel App Team</strong> `,
    });

    console.log("✅ Verification email sent successfully: " + info.messageId);
  } catch (error) {
    console.error("❌ Failed to send verification email:", error.message);
  }
};