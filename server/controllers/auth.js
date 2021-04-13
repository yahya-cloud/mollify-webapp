import bcrypt from 'bcryptjs';
import {DoctorModel,PatientModel} from '../models/models.js';


 async function searchModels(email){
     try {
        let model
        model = await  DoctorModel.findOne({email});
        if(!model) {
        model = await PatientModel.findOne({email});
        }
        return model;   
     } catch (error) {
         console.log(error);
     }
}

export const signIn = async (req, res) => {

  try {
    const oldUser = await searchModels(req.body.email);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(req.body.password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({result: oldUser});
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
    
    try {
      const oldUser = await searchModels(req.body.email);
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
      const result = await (req.body.userType === 'doctor' ? DoctorModel : PatientModel).create({...req.body, password:hashedPassword});

      res.status(201).json(result);

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };