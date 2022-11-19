import moogoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generateId.js';



const vetSchema = moogoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    isDriver: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmed: {
        type: Boolean,
        default: false,
    }
});


//Hash Password
vetSchema.pre('save', async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Comprobate password
vetSchema.methods.comprobatePassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}



const Vet = moogoose.model('Vet', vetSchema);
export default Vet;
