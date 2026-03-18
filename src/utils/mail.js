import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// mailgen generator
const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed sinlently. Make sure you have provided your MAILTRAP credentials in the .env files",
    );
    console.error("Error: ", error);
  }
};

// email verification mailgen content
const emailVerificationMailgenContant = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we are excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button.",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have question? Just reply to this email, we'd love to help.",
    },
  };
};

// forgot password mailgen content
const forgotPasswordMailgenContant = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset a password on your account.",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have question? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  emailVerificationMailgenContant,
  forgotPasswordMailgenContant,
  sendEmail,
};
