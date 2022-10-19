import nodemailer from 'nodemailer';



const emailForgotPassword = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //SEND EMAIL
    const {email, name, token} = data;
    
    const info = await transport.sendMail({
        from: 'Transportes Duoc',
        to: email,
        subject: 'Restablece tu Password',
        text: 'Restablece tu Password',
        html: `<p> Hola ${name}, has solicitado reestablecer tu password.</p>

        <p> Sigue el siguiente enlace para generar un nuevo password:
        <a href="${process.env.FRONTEND_URL}/change-password/${token}">Reestablecer password</a> </p>

        <p> Si tu no creaste tu cuenta, puedes ignorar este mensaje</p>
         `
    });
};



export default emailForgotPassword;