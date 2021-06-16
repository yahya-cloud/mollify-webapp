import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import checkValidity from './checkvalidity'

import './Form.css'
import Button from '../UI/Button/Button'
import Input from './Input/Input'

const Form = (props) => {
  const [inputData, setInputData] = useState({})
  const [formIsValid, setFormIsValid] = useState(false)
  const [priceInput, setPriceInput] = useState(false)

  //setting input and their validation fields
  useEffect(() => {
    if (!props.signup) {
      setInputData({
        email: {
          type: 'email',
          name: 'email',
          value: '',
          validation: {
            required: true,
            checkEmail: true,
          },
          valid: false,
          touched: false,
        },

        password: {
          type: 'password',
          name: 'password',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      })
    } else {
      setInputData({
        photo: {
          type: 'photo',
          name: 'photo',
          value: '',
          validation: {},
          valid: true,
          touched: false,
        },
        name: {
          type: 'text',
          name: 'name',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        country: {
          type: 'country',
          name: 'country',
          value: 'afghanistan',
          validation: {},
          valid: true,
          touched: false,
        },
        state: {
          type: 'text',
          name: 'state',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        address: {
          type: 'text',
          name: 'address',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        userType: {
          type: 'userType',
          name: 'userType',
          value: 'patient',
          validation: {},
          valid: true,
          touched: false,
        },
        email: {
          type: 'email',
          name: 'email',
          value: '',
          validation: {
            required: true,
            checkEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          type: 'password',
          name: 'password',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        phoneNumber: {
          type: 'text',
          name: 'phoneNumber',
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      })
    }
  }, [props.signup])

  //array to map inputs
  const formInputs = []
  for (let key in inputData) {
    formInputs.push({ ...inputData[key] })
  }

  //function to show/hide price input
  const priceInputHandler = (formData) => {
    let tempObject

    if (priceInput) {
      tempObject = _.omit(formData, 'price')
      setPriceInput(false)
      return tempObject
    } else {
      tempObject = {
        ...formData,
        price: {
          type: 'text',
          name: 'price',
          value: '',
          validation: {},
          valid: true,
          touched: false,
        },
      }
      setPriceInput(true)
      return tempObject
    }
  }

  const changeHandler = (e, photoData) => {
    //changing object reference
    let updatedForm = { ...inputData }

    //file base64 react doest give event object
    if (photoData) {
      updatedForm['photo'].value = photoData
    } else {
      const updatedFormElement = updatedForm[e.target.name]
      updatedFormElement.value = e.target.value
      updatedFormElement.valid = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      )
      updatedFormElement.touched = true
      updatedForm[e.target.name] = updatedFormElement
    }

    //checking if all the fields are valid
    let tempFormIsValid = true
    for (let input in updatedForm) {
      tempFormIsValid = updatedForm[input].valid && tempFormIsValid
    }

    //checking if userType is doctor adding price input
    if (e?.target.name === 'userType') {
      updatedForm = priceInputHandler(updatedForm)
    }

    setInputData(updatedForm)
    setFormIsValid(tempFormIsValid)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let formData = {}
    for (let key in inputData) {
      if (key !== 'country' && key !== 'state') {
        //if field is not related to address
        formData[key] = inputData[key].value
      }
    }
    if (props.signup) {
      //setting up address field to store in address
      formData['address'] =
        `${inputData['address'].value}  ${inputData['state'].value}  ${inputData['country'].value}`.trim()
    }
    props.handleSubmit(formData)
  }

  return (
    <form className='mainForm' onSubmit={(e) => submitHandler(e)}>
      {formInputs.map((el, id) => {
        return (
          <Input
            key={id}
            type={el.type}
            name={el.name}
            changeHandler={changeHandler}
            value={el.value}
            shouldValidate={el.validation}
            isTouched={el.touched}
            inValid={!el.valid}
          />
        )
      })}

      <Button disabled={!formIsValid} btnType='btnCard' btnColor='btnGreen'>
        Submit Details
      </Button>
    </form>
  )
}

export default Form
