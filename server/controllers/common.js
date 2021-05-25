import PatientModel from '../models/patient.js';
import DoctorModel from '../models/doctor.js'

export const searchModels = async (email) => {
    try {
       let model;
       model = await  DoctorModel.findOne({email});
       if(!model) {
       model = await PatientModel.findOne({email});
       }
       return (model);   
    } catch (error) {
        console.log(error);
    }
}


export const deleteRequest = async(req, res) => {
    try {
        const {userEmail,userType, personEmail} = req.body; 
        let result;

        userType === 'patient' ?
        result = await  PatientModel.findOneAndUpdate({email: userEmail},
            {$pull: {acceptedRequests: {email: personEmail}}}, {new: true})
        :
        result = await  DoctorModel.findOneAndUpdate({email: userEmail},
            {$pull: {requests: {email: personEmail}}}, {new: true})

        res.status(200).json({result})
    } catch (error) {
        console.log(error);
    }
}