import nodemailer from 'nodemailer';

// Send verification email
const sendVerificationEmail = async (email, token) => {
    try {
        // Create a transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verifica tu cuenta',
            text: `Haz click en el link para verificar tu cuenta en Heladerías Aloha, Puerto Madryn: http://yourapp.com/verify?token=${token}\n\nEste token expirará en 15 minutos.`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

export { sendVerificationEmail };