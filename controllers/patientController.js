import Patient from "../models/Patient.js"



const addPatient = async (req, res) => {
    const patient = new Patient(req.body);
    patient.vet = req.vet._id;

    try {
        const patientSave = await patient.save();
        res.json(patientSave);
    } catch (error) {
        console.log(error);
    }
}


const getPatients = async (req, res) => {
    const patients = await Patient.find().where('vet').equals(req.vet);
    res.json(patients);
}

const getAllTrips = async (req, res) => {
    const trips = await Patient.find().where('status').equals('Disponible');
    res.json(trips);
}


const getPatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
        res.status(404).json({ msg: "No encontrado" });
    }

    if (patient.vet._id.toString() !== req.vet._id.toString()) {
        return res.json({ msg: 'Acción no valida' });
    }

    return res.json(patient);
}


const bookTrip = async (req, res) => {
    const { id } = req.params;

    const trip = await Patient.findById(id);

    if (!trip) {
        res.status(404).json({ msg: "No encontrado" });
    }

    //Update trip
    trip.name_passenger = req.body.name_passenger;
    trip.passenger = req.vet._id;
    trip.status = "Confirmado";
    try {
        const tripUpdated = await trip.save();
        return res.json(tripUpdated);
    } catch (error) {
        console.log(error);
    }
}


const deletePatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
        res.status(404).json({ msg: "No encontrado" });
    }

    if (patient.vet._id.toString() !== req.vet._id.toString()) {
        return res.json({ msg: 'Acción no valida' });
    }

    try {
        await patient.deleteOne()
        return res.json({ msg: "Paciente eliminado" });

    } catch (error) {
        console.log(error);
    }
}



export {
    addPatient,
    getPatients,
    getAllTrips,
    getPatient,
    bookTrip,
    deletePatient
}