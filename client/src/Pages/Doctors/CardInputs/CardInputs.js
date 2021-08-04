import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import classes from './cardInputs.module.css'
import { IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const CardInputs = (props) => {
  const [data, setData] = useState({
    time: '',
    sessionType: 'Home',
    gender: 'Male',
    disorder: 'Anxiety',
  })

  const changeHandler = (e) => {
    let updatedData = { ...data }
    updatedData[e.target.name] = e.target.value
    setData(updatedData)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.submitFunction(data)
  }

  return (
    <form className={classes.InputContainer}>
      <IconButton
        onClick={() => props.closeForm()}
        color='secondary'
        aria-label='delete'
        className={classes.closeButton}
        size='small'>
        <CancelIcon fontSize='medium' />
      </IconButton>
      <h1>Please fill the following details</h1>
      <div className={classes.inputBox}>
        <h3>Time:</h3>
        <DateTimePickerComponent
          min={new Date()}
          name='time'
          id='datetimepicker'
          value={data.time}
          onChange={(e) => changeHandler(e)}
        />
      </div>

      <div className={classes.inputBox}>
        <h3>SessionType:</h3>
        <select
          type='select'
          name='sessionType'
          onChange={(e) => changeHandler(e)}>
          <option value='home'>Home</option>
          <option value='clinic'>Clinic</option>
          <option value='virtual'>Virtual</option>
        </select>
      </div>

      <div className={classes.inputBox}>
        <h3>Gender:</h3>
        <select type='select' name='gender' onChange={(e) => changeHandler(e)}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>

      <div className={classes.inputBox}>
        <h3>Disorder:</h3>
        <select
          type='select'
          name='disorder'
          onChange={(e) => changeHandler(e)}>
          <option value='anxiety'>Anxiety</option>
          <option value='stress'>Stress</option>
          <option value='depression'>Depression</option>
          <option value='traumatic'>Post Traumatic</option>
          <option value='eating'>Eating</option>
        </select>
      </div>

      <Button
        btnType='btnCard'
        btnColor='btnBlue'
        clickHandler={(e) => submitHandler(e)}>
        Submit Details
      </Button>
    </form>
  )
}

export default CardInputs
