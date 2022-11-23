import { Router } from 'express';
import {
    addPatient,
    bookTrip,
    getPatients,
    getAllTrips,
    getPatient,
    deletePatient,
    getTripsBookedPassenger
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
    .delete(checkAuth, deletePatient);

router.get('/trip/allTrip', getAllTrips);
router.get('/trip/passenger',checkAuth, getTripsBookedPassenger);
router.put('/trip/:id',checkAuth, bookTrip);


    
export default router;