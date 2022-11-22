import moogoose from 'mongoose';



const patientSchema = moogoose.Schema({
    destiny: {
        type: String,
        required: true,
        trim: true,
    },
    date :{
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    name_driver: {
        type: String,
        required: true,
    },
    vet: {
        type: moogoose.Schema.Types.ObjectId,
        ref: 'Vet',
    },
    name_passenger: {
        type: String,
        required: true,
        default: 'Sin pasajero'
    },
    passenger: {
        type: moogoose.Schema.Types.ObjectId,
        ref: 'Vet',
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: 'Disponible',
    }
},
    {
        timestamps: true
    }
);



const Patient = moogoose.model('Patient', patientSchema);
export default Patient;