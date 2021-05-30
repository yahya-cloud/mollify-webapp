import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';
import commonRoutes from './routes/common.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//routes
app.use(authRoutes);
app.use(patientRoutes);
app.use(doctorRoutes);
app.use(commonRoutes);

app.get('/', (req, res) => { res.send('Hello from Express!')})


//CONNECTION URL FROM MONGOOSE
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('server running on port '+ PORT)))
.catch((err) => console.log(err))

mongoose.set('useFindAndModify', false)

