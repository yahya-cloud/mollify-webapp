import PatientModel from '../models/patient.js';
import DoctorModel from '../models/doctor.js'

export const acceptSession = async(req, res) => {
    try {
        const personEmail = req.body.person.email;
        const {name, email, address, phoneNumber, photo} = req.body.user;
        const {time, sessionType, disorder} = req.body.person;
        const personName = req.body.person.name;
        const personPhoto = req.body.person.photo;


        await PatientModel.findOneAndUpdate({email:personEmail}, { $push: {acceptedRequests: {
            name:name, time:time, sessionType:sessionType, email: email, address: address, phoneNumber: phoneNumber, photo: photo  }
        }});
   
        const result = await DoctorModel.findOneAndUpdate({email: email},
            {$pull: {requests: {email: personEmail}},
             $push:{schedules: {name: personName, time:time, sessionType:sessionType, photo:personPhoto, disorder: disorder.toLowerCase()}}
        }, 
            {new: true});
            
            res.status(200).json({result})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
}

export const sessionFailed = async(req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const personId =  req.body.personId;

        const result = await DoctorModel.findOneAndUpdate({email: userEmail}, 
            {$pull: {schedules: {_id: personId}},
             $inc: {'sessions.failed': 1}
            }
            ,{new: true});

        res.status(200).json({result});
    } catch (error) {
        console.log(error);
    }
}


export const sessionSucceed = async(req, res) => {
    try {
        const {price, _id} = req.body.user;
        const {sessionType, disorder} = req.body.person;
        const personId = req.body.person;

        const result  = await DoctorModel.findOneAndUpdate({_id: _id},
        {$inc: {earnings:price,'sessions.total': 1, [`sessions.${sessionType.toLowerCase()}`]:1, [`disorders.${disorder.toLowerCase()}`]:1 },
        $pull: {schedules: {_id: personId}}
        },
        {new: true})
        res.status(200).json({result});
    } catch (error) {
        console.log(error);
    }
}


//i understand bhut bache hai jinhe classes shi se na hone pr problem hai 