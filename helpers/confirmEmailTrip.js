import nodemailer from 'nodemailer';



const confirmEmailTripDriver = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //Send Email
    const {
        driverEmail, driverName, destinyTrip,
        dateTrip, hourTrip, passengerEmail, passengerName }
        = data;

    const info = await transport.sendMail({
        from: 'Transportes Duoc',
        to: driverEmail,
        subject: 'Viaje Confirmado',
        text: 'Viaje confirmado',
        html: `<p> Hola ${driverName}, tu viaje a ${destinyTrip} ha sido confirmado.</p>

        <p> <b>${driverName}</b> tu viaje a <b>${destinyTrip} el dia ${dateTrip} a las ${hourTrip}</b>
        ha sido confirmado por <b>${passengerName}</b> te recomendamos ponerte 
        en contacto con el, su correo electrónico es: ${passengerEmail}.

        <p> Para más información dirígete a tu aplicación.</p>
     

        <p> Si este correo fue enviado a ti por error puedes ignorarlo</p>
         `
    });
};

const confirmEmailTripPassenger = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //Send Email
    const {
        driverEmail, driverName, destinyTrip,
        dateTrip, hourTrip, passengerEmail, passengerName }
        = data;

    const info = await transport.sendMail({
        from: 'Transportes Duoc',
        to: passengerEmail,
        subject: 'Viaje Confirmado',
        text: 'Viaje confirmado',
        html: `<p> Hola ${passengerName}, has confirmado el viaje a ${destinyTrip}.</p>

        <p> <b>${passengerName}</b> has confirmado el viaje a <b>${destinyTrip} el dia ${dateTrip} a las ${hourTrip},</b>
        tu conductor que te llevará a destino es <b>${driverName}</b> te recomendamos ponerte 
        en contacto con el, su correo electrónico es: ${driverEmail}.

        <p> Para más información dirígete a tu aplicación.</p>
     

        <p> Si este correo fue enviado a ti por error puedes ignorarlo</p>
         `
    });
};


export{
    confirmEmailTripDriver,
    confirmEmailTripPassenger
}