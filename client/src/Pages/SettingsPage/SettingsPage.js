import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/Form/Input/Input'

import { updateUser } from '../../store/actions/auth'
import Meta from '../../components/Meta/Meta'

const SettingsPage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { photo, name, address, phoneNumber } = user

  const [inputData, setInputData] = useState({
    photo: { type: 'photo', name: 'photo', value: photo },
    name: { type: 'text', name: 'name', value: name },
    address: { type: 'text', name: 'address', value: address },
    phoneNumber: { type: 'text', name: 'phoneNumber', value: phoneNumber },
  })
  const [passwordData, setPasswordData] = useState({
    password: { name: 'password', value: '' },
    newPassword: { name: 'newPassword', value: '' },
  })

  const formInputs = []
  for (let key in inputData) {
    formInputs.push({ ...inputData[key] })
  }

  const changeHandler = (e, photoData) => {
    let updatedForm = { ...inputData }
    if (photoData) {
      updatedForm['photo'].value = photoData
    } else {
      updatedForm[e.target.name].value = e.target.value
    }
    setInputData({ ...updatedForm })
  }

  const changePasswordHandler = (e) => {
    let updatedForm = { ...passwordData }
    updatedForm[e.target.name].value = e.target.value
    setPasswordData({ ...updatedForm })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    let userData = {}
    for (let key in inputData) {
      userData[key] = inputData[key].value
    }

    let tempPasswordData = {}
    for (let key in passwordData) {
      tempPasswordData[key] = passwordData[key].value
    }

    const params = {
      userData: { ...userData },
      passwordData: { ...tempPasswordData },
    }
    dispatch(updateUser(params))
    setPasswordData({
      password: { name: 'password', value: '' },
      newPassword: { name: 'newPassword', value: '' },
    })
  }

  return (
    <div className='formContainer'>
      <Meta title='Mollify | Settings Page'/>
      <h1>Edit Your Profile</h1>
      <form className='mainForm' onSubmit={(e) => formSubmitHandler(e)}>
        {formInputs.map((el) => {
          return (
            <Input
              type={el.type}
              name={el.name}
              changeHandler={changeHandler}
              value={el.value}
            />
          )
        })}
        <div className='inputContainer'>
          <label className='label' for='password'>
            Enter Password
          </label>
          <input
            id='password'
            className='input'
            value={passwordData.password.value}
            type='password'
            placeholder={`Enter password`}
            name='password'
            onChange={(e) => changePasswordHandler(e)}
          />
        </div>
        <div className='inputContainer'>
          <label className='label' for='password'>
            Enter New password
          </label>
          <input
            id='password'
            className='input'
            value={passwordData.newPassword.value}
            type='password'
            placeholder={`Enter New password`}
            name='newPassword'
            onChange={(e) => changePasswordHandler(e)}
          />
        </div>

        <Button btnType='btnCard' btnColor='btnGreen'>
          Edit Details
        </Button>
      </form>
    </div>
  )
}

export default SettingsPage
