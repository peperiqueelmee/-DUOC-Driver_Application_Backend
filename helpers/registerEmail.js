import nodemailer from 'nodemailer';



const emailRegister = async (data) => {
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
        subject: 'Comprueba tu cuenta en Transportes Duoc',
        text: 'Comprueba tu cuenta en Transportes Duoc',
        html: `<p> Hola ${name} comprueba tu cuenta en Transportes Duoc</p>
        <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/account-confirm/${token}">Comprobar cuenta</a> </p>

        <p> Si tu no creaste tu cuenta, puedes ignorar este mensaje.</p>
         `
    });
};



export default emailRegister;