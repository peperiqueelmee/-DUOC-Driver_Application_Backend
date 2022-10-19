import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv/config';
import cors from 'cors';
import vetRoutes from './routes/vetRoutes.js'
import patientRoutes from './routes/patientRoutes.js'



const app = express();
app.use(express.json());


//Connect to BD
connectDB();


//CORS config
const allowedDomains = [process.env.FRONTEND_URL];

const cosrOptions = {
    origin: function(origin, callback){
        if(allowedDomains.indexOf(origin) !== 1 ){           
            //Origin request is allowed
            callback(null, true);
        } else {
            callback(new Error('Not allowed for CORS'));
        }
    }
};
app.use(cors(cosrOptions));


//PORT
const PORT = process.env.PORT || 4000;


//Routes
app.use('/api/veterinarios', vetRoutes);
app.use('/api/pacientes', patientRoutes);


//Execution server
app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}\nhttp://localhost:${PORT}`);
});
