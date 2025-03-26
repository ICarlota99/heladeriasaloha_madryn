import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationUrl) => {
  const mailOptions = {
    from: `"Heladerías Aloha" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verifica tu cuenta',
    html: `
      <h2>Bienvenido a la familia de Heladerías Aloha!</h2>
      <p>Haz click en el siguiente link para verificar tu cuenta:</p>
      <a href="${verificationUrl}" 
         style="background:#ff6b01;color:white;padding:10px 20px;text-decoration:none;border-radius:5px">
         Verificar Cuenta
      </a>
      <p><strong>Este link funcionará por 15 minutos.</strong></p>
      <p>Si no solicitaste convertirte en usuario de Heladerías Aloha, por favor ignora este correo.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};