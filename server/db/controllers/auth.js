import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import DoctorModel from '../models/doctor.js'
import PatientModel from '../models/patient.js'
//function used in SignIn to search models
import { searchModels } from './common.js'
dotenv.config()

const secret = process.env.SECRET

// @desc  SignIn user
// @route POST/api/auth/signIn
// @access Public
export const signIn = async (req, res) => {
  try {
    const oldUser = await searchModels(req.body.email)

    if (!oldUser)
      return res
        .status(404)
        .json({ message: "User doesn't exist. Please sign up or try again " })

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      oldUser.password
    )

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: 'Invalid Password. Please try again' })

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    })

    res.status(200).json({ result: oldUser, token })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later' })
  }
}

// @desc  SignUp user
// @route POST/api/auth/signUp
// @access Public
export const signUp = async (req, res) => {
  try {
    const oldUser = await searchModels(req.body.email)

    if (oldUser)
      return res
        .status(400)
        .json({ message: 'User already exists. Please Go to sign-in page' })

    const hashedPassword = await bcrypt.hash(req.body.password, 12)

    const result = await (req.body.userType === 'doctor'
      ? DoctorModel
      : PatientModel
    ).create({ ...req.body, password: hashedPassword })

    const token = jwt.sign({ id: result.id }, secret, { expiresIn: '1h' })

    res.status(200).json({ result, token })
  } catch (error) {
    
    res
      .status(500)
      .json({ message: error.message })
  }
}

// @desc  Get user
// @route GET/api/auth/getUser
// @access Private
export const getUser = async (req, res) => {
  try {
    res.status(201).json({ result: req.user })
  } catch (error) {
    console.log(error)
  }
}

// @desc  Update user
// @route GET/api/auth/updateUser
// @access Private
export const updateUser = async (req, res) => {
  try {
    const { userData, passwordData } = req.body
    const { _id: id, userType } = req.user
    const newPassword = passwordData.newPassword
    let result

    if (newPassword) {
      const oldUser = req.user

      const isPasswordCorrect = await bcrypt.compare(
        passwordData.password,
        oldUser.password
      )

      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ message: "Password doesn't match. Please try again" })

      const hashedPassword = await bcrypt.hash(newPassword, 12)

      result = await (userType === 'doctor'
        ? DoctorModel
        : PatientModel
      ).findByIdAndUpdate(
        id,
        { ...userData, password: hashedPassword },
        { new: true }
      )

      res.status(200).json({
        result,
        message: 'Password and Details have been successfully updated',
      })
    } else {
      result = await (userType === 'doctor'
        ? DoctorModel
        : PatientModel
      ).findByIdAndUpdate(id, { ...userData }, { new: true })

      res
        .status(200)
        .json({ result, message: 'Details have been successfully updated' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later' })
  }
}

// @desc  Delete user
// @route GET/api/auth/DeleteUser
// @access Private
export const deleteUser = async (req, res) => {
  try {
    const { id: id, userType } = req.user

    await (userType === 'doctor'
      ? DoctorModel
      : PatientModel
    ).findByIdAndDelete(id)
    res.json({ message: 'Profile deleted Successfully' })
  } catch (error) {
    console.log(error)
    res.json({ message: 'We were unable to delete your profile' })
  }
}
