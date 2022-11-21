import Vet from "../models/Vet.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailRegister from "../helpers/registerEmail.js";
import emailForgotPassword from "../helpers/forgotPasswordEmail.js";



const register = async (req, res) => {
    const { email, name } = req.body;

    //Prevent duplicates user
    const exitstUser = await Vet.findOne({ email }).collation({locale:'en', strength: 2});

    if (exitstUser) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    //Save new vet
    try {
        const vet = new Vet(req.body);
        const vetSave = await vet.save();

        //Send email
        emailRegister({
            email,
            name,
            token: vetSave.token
        });


        res.json(vetSave);
    } catch (error) {
        console.log(error);
    }
};


const profile = (req, res) => {
    const { vet } = req;

    res.json(vet);
};


const confirm = async (req, res) => {
    const { token } = req.params;
    const userConfirmed = await Vet.findOne({ token });

    if (!userConfirmed) {
        const error = new Error('Token no Válido');
        return res.status(404).json({ msg: error.message });
    };

    try {
        userConfirmed.token = null;
        userConfirmed.confirmed = true;

        await userConfirmed.save();
        const { name } = userConfirmed;

        return res.json({ msg: 'Usuario confirmado correctamente', name });
    } catch (error) {
        console.log(error);
    }
};


const autenticate = async (req, res) => {
    const { email, password } = req.body

    //Get user
    const user = await Vet.findOne({ email }).collation({locale:'en', strength: 2});

    //Check if exists user
    if (!user) {
        const error = new Error('Usuario no registrado');
        return res.status(400).json({ msg: error.message });
    };

    //Check if user is confirmed
    if (!user.confirmed) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    };

    //Comprobate password
    if (!await user.comprobatePassword(password)) {
        const error = new Error('Correo y/o password incorrecto');
        return res.status(403).json({ msg: error.message });
    };

    //Autenticate
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isDriver: user.isDriver,
        token: generateJWT(user.id)
    });
};


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    //Get User
    const user = await Vet.findOne({ email }).collation({locale:'en', strength: 2});

    //Check if exists user
    if (!user) {
        const error = new Error('Usuario no registrado');
        return res.status(400).json({ msg: error.message });
    };

    try {
        user.token = generateId();
        await user.save();

        //Send email with instructions
        emailForgotPassword({
            email,
            name: user.name,
            token: user.token
        });


        res.json({ msg: "Hemos enviado un e-mail con las instrucciones" });
    } catch (error) {
        console.log(error);
    }
};


const checkToken = async (req, res) => {
    const { token } = req.params;

    const tokenValidate = await Vet.findOne({ token });

    if (!tokenValidate) {
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    };

    const { name } = tokenValidate;


    return res.json({ msg: 'Token válido y el usuario existe', name });
};


const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await Vet.findOne({ token });

    if (!user) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    };

    try {
        user.token = null;
        user.password = password;
        await user.save();

        res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
        console.log(error);
    };
};


const updateProfile = async (req, res) => {
    const vet = await Vet.findById(req.params.id);

    if (!vet) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    };

    const { email } = req.body
    if (vet.email !== req.body.email) {
        const emailExists = await Vet.findOne({ email });

        if (emailExists) {
            const error = new Error('Ese email ya esta en uso');
            return res.status(400).json({ msg: error.message });
        }
    };

    try {
        vet.name = req.body.name;
        vet.email = req.body.email;
        vet.web = req.body.web;
        vet.phone = req.body.phone;

        const updatedVet = await vet.save();
        res.json(updatedVet);

    } catch (error) {
        console.log(error);
    }
};

const updatePassword = async (req, res) => {
    //Read Data
    const { id } = req.vet;
    const { current_pwd, new_pwd } = req.body;

    //Check Vet Exist
    const vet = await Vet.findById(id);

    if (!vet) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    };

    //Check Password
    if (!await vet.comprobatePassword(current_pwd)) {
        const error = new Error('El password Actual es Incorrecto');
        return res.status(400).json({ msg: error.message });
    };

    //Save New Password
    vet.password = new_pwd;
    await vet.save();
    res.json({ msg: 'Password Almacenado Correctamente' });
};



export {
    register,
    profile,
    confirm,
    autenticate,
    forgotPassword,
    checkToken,
    newPassword,
    updateProfile,
    updatePassword
}