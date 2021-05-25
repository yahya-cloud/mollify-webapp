import PatientModel from '../models/patient.js';
import DoctorModel from '../models/doctor.js'

export const getDoctors = async(req, res) => {
    try {
        const result = await DoctorModel.find();
        res.status(200).json({result: result});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const requestSession = async(req, res) => {
    try {
        const {name, time, sessionType, email, address, phoneNumber, photo, gender, disorder} = req.body.user;
        const result =  await DoctorModel.findOneAndUpdate({email: req.body.personEmail}, { $push: {requests: {
            name:name, gender:gender, time:time, sessionType:sessionType, disorder: disorder, email: email, address: address, phoneNumber: phoneNumber, photo: photo  }
        }})

        if(result)
        {res.status(200).json({message: 'Request have been successfully made'});}
        else{throw new Error()}

    } catch (error) {
        res.status(500).json({message: 'Sorry server error.Please request session again'})
    }
}