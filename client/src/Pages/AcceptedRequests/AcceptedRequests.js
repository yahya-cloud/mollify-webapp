import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import { rejectRequest } from '../../store/actions/doctor'
import { submitRating } from '../../store/actions/patient'
import { makeStyles } from '@material-ui/core/styles'

import GridContainer from '../../components/GridContainer/GridContainer'
import RateCard from './RateCard/RateCard'

//modal for rating
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const AcceptedRequests = () => {
  const { user } = useSelector((state) => state)

  //to show rating  after submit
  const [show, setShow] = useState(false)
  const [doctorData, setDoctorData] = useState()

  const classes = useStyles()
  const dispatch = useDispatch()

  const submitRatingHandler = (rating) => {
    setShow(false)
    dispatch(
      submitRating({ userRating: `star${rating}`, email: doctorData.email })
    )
    dispatch(rejectRequest(doctorData.email))
  }

  const sessionCompleteHandler = (data) => {
    setShow(true)
    setDoctorData(data.personData)
  }

  return (
    <div>
      <GridContainer
        cardArray={user.acceptedRequests}
        userType='patient'
        redBtnFunc={sessionCompleteHandler}
        redBtnTxt='Session Completed'
      />
      <Backdrop open={show} className={classes.backdrop}>
        <RateCard btnFunc={submitRatingHandler} />
      </Backdrop>
    </div>
  )
}

export default AcceptedRequests
