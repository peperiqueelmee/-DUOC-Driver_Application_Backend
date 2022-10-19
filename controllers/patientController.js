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


const updatePatient = async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);

    if (!patient) {
        res.status(404).json({ msg: "No encontrado" });
    }

    if (patient.vet._id.toString() !== req.vet._id.toString()) {
        return res.json({ msg: 'Acción no valida' });
    }

    //Update Patient
    patient.name = req.body.name || patient.name;
    patient.owner = req.body.owner || patient.owner;
    patient.email = req.body.email || patient.email;
    patient.date = req.body.date || patient.date;
    patient.symptoms = req.body.symptoms || patient.symptoms;

    try {
        const patientUpdated = await patient.save();
        return res.json(patientUpdated);
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
    getPatient,
    updatePatient,
    deletePatient
}