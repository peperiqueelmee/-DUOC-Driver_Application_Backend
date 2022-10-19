import moogoose from 'mongoose';



const patientSchema = moogoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    symptoms:{
        type: String,
        required: true,
    },
    vet: {
        type: moogoose.Schema.Types.ObjectId,
        ref: 'Vet',
    },
},
    {
        timestamps: true
    }
);



const Patient = moogoose.model('Patient', patientSchema);
export default Patient;