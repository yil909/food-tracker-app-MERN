import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();


router.post('/send-email', async (req, res) => {
    const {firstName, lastName, email, phoneNumber, subject, message} = req.body;

    const recipients = ["yil909@aucklanduni.ac.nz", "wany056@aucklanduni.ac.nz", "cwon301@aucklanduni.ac.nz", "donggy2022@126.com"]

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
        port: 465, // Port for SMTP (usually 465)
        secure: true, // Usually true if connecting to port 465
        auth: {
            user: "foodwastetracker@gmail.com", // Your email address
            pass: "jimd wlas qcos vgsl", // Password (for gmail, your app password)
            // ⚠️ For better security, use environment variables set on the server for these values when deploying
        },
    });

    try {
        let info = await transporter.sendMail({
            from: `"${firstName} ${lastName}" <${email}>`,
            to: recipients.join(", "), // Replace with your email
            subject: subject,
            html: ` <p>Inqury message from user ${firstName} ${lastName}</p>
                    <p>${message}</p>
                    <p>User phone number: ${phoneNumber}</p>
                    <p>User email: ${email}</p>
`, // Replace with your message
        });

        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Failed to send email:", error);
        res.status(500).send("Failed to send email");
    }

});
export default router;