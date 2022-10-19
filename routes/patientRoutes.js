import { Router } from 'express';
import {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} from '../controllers/patientController.js'
import checkAuth from '../middlewares/autMiddleware.js';



const router = Router();

router
    .route('/')
    .post(checkAuth, addPatient)
    .get(checkAuth, getPatients);

router
    .route('/:id')
    .get(checkAuth, getPatient)
    .put(checkAuth, updatePatient)
    .delete(checkAuth, deletePatient);


    
export default router;