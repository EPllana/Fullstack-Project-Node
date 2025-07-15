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
      from: `"Travel APP" <${process.env.EMAIL_USER}>`, // emri dhe emaili i dërguesit
      to: toEmail, // marrësi
      subject: "Welcome To Our Travel App", // subjekti
      html: `
        <h2>Hi, ${name}</h2>
        <p>Welcome aboard!</p>
        <p> Let un know if you need anything</p>
        <br>
        <strong> -n Travel app team ,/strong>,
      `, // përmbajtja e emailit (HTML)
    });

    console.log("Email sent: " + info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
