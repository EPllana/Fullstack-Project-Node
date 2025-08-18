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

// Funksioni për të dërguar email verifikimi
export const sendVerificationEmail = async (email, name, verificationToken) => {
  console.log(`Sending email to: ${email}`);  // Sigurohu që email-i është i saktë
  console.log(`Verification Token: ${verificationToken}`);  // Kontrollo vlerën e token-it

  const verificationLink = `http://localhost:3000/api/users/verify-email?token=${verificationToken}`;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,  // Ky email duhet të kalojë këtu
      subject: "Verify your email",
      html: `<p>Hello ${name}, please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`,
    });

    console.log("✅ Verification email sent successfully.");
  } catch (error) {
    console.error("❌ Failed to send verification email:", error.message);
  }
};
