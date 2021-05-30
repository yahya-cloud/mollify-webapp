import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import DoctorModel from '../models/doctor.js';
import PatientModel from '../models/patient.js';
import {searchModels} from './common.js';
dotenv.config();

const secret = process.env.SECRET;

export const signIn = async (req, res) => {
  try {
    const oldUser = await searchModels(req.body.email);

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist. Please sign up or try again " });

    const isPasswordCorrect = await bcrypt.compare(req.body.password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password. Please try again" });

    const token = jwt.sign({email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({result: oldUser, token});

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

export const signUp = async (req, res) => {

    
    try {

      const oldUser = await searchModels(req.body.email);
  
      if (oldUser) return res.status(400).json({ message: "User already exists. Please Go to sign-in page" });
  
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
      const result = await (req.body.userType === 'doctor' ? DoctorModel : PatientModel).create({...req.body, password:hashedPassword});

      const token = jwt.sign( {email: result.email}, secret, { expiresIn: "1h" } );
    
      res.status(200).json({result, token});

    } catch (error) {
      res.status(500).json({ message: `Something went wrong. Please try again later`});
    }
  };

  export const getUser = async (req, res) => {
    try {
      const user = await searchModels(req.body.email);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  export const updateUser = async (req, res) => {
    try {
      const {userData, passwordData, id} = req.body;
      const newPassword = passwordData.newPassword;
      const userEmail = req.body.email;
      let result;

      if(newPassword){

        const oldUser = await searchModels(userEmail);
        
        const isPasswordCorrect = await bcrypt.compare(passwordData.password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Password doesn't match. Please try again" });
        
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        result =  await (req.body.userType === 'doctor' ? DoctorModel : PatientModel).findByIdAndUpdate(id, {...userData, password: hashedPassword}, {new: true});
        
        res.status(200).json({result, message:"Password and Details have been successfully updated"});
      }else{
        result =  await (req.body.userType === 'doctor' ? DoctorModel : PatientModel).findByIdAndUpdate(id, {...userData}, {new: true});

        res.status(200).json({result, message:"Details have been successfully updated"});
      } 
        
    } catch (error) {
      res.status(500).json({ message: "Something went wrong. Please try again later" });
    }
    
}

export const deleteUser = async (req, res) => {
  try {
    const {id: id, userType} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No user with that id');
    }

    await (userType === 'doctor' ? DoctorModel : PatientModel).findByIdAndDelete(id);
    res.json({message: "Profile deleted Successfully"})
  } catch (error) {
    console.log(error);
  }
}