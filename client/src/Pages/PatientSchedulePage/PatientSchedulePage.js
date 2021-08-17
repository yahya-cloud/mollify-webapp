import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import { sessionCompleted } from '../../store/actions/patient'
import { makeStyles } from '@material-ui/core/styles'
import RateCard from '../AcceptedRequests/RateCard/RateCard'
import Schedule from '../../components/Schedule/Schedule'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const PatientSchedulePage = () => {
  const { user } = useSelector((state) => state)

  //to show rating  after submit
  const [show, setShow] = useState(false)
  const [doctorData, setDoctorData] = useState(null)

  const classes = useStyles()
  const dispatch = useDispatch()

  const submitRatingHandler = (rating) => {
    setShow(false)
    dispatch(
      sessionCompleted({ userRating: `star${rating}`, doctorData: doctorData })
    )
  }

  const sessionCompleteHandler = (data) => {
    setShow(true)
    setDoctorData(data)
  }

  return (
    <>
      <Schedule user={user} greenBtnFunc={sessionCompleteHandler} />
      <Backdrop open={show} className={classes.backdrop}>
        <RateCard closeForm={setShow} btnFunc={submitRatingHandler} />
      </Backdrop>
    </>
  )
}

export default PatientSchedulePage
