import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';


const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//routes
app.use(authRoutes);


//CONNECTION URL FROM MONGOOSE
const CONNECTION_URL = 'mongodb+srv://mollify-server:nSvN8uCTKf1zYOfy@cluster0.sscnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('server running on port '+ PORT)))
.catch((err) => console.log(err))

mongoose.set('useFindAndModify', false);