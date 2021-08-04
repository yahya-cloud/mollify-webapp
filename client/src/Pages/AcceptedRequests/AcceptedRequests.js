import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import { sessionCompleted } from '../../store/actions/patient'
import { makeStyles } from '@material-ui/core/styles'

import GridContainer from '../../components/GridContainer/GridContainer'
import RateCard from './RateCard/RateCard'
import Meta from '../../components/Meta/Meta'

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
      sessionCompleted({ userRating: `star${rating}`, doctorData: doctorData })
    )
  }

  const sessionCompleteHandler = (data) => {
    setShow(true)
    setDoctorData(data)
  }

  return (
    <div>
      <Meta title='Mollify | Accepted Requests'/>
      <GridContainer
        cardArray={user.schedules}
        userType='patient'
        redBtnFunc={sessionCompleteHandler}
        redBtnTxt='Session Completed'
      />
      <Backdrop open={show} className={classes.backdrop}>
        <RateCard closeForm={setShow} btnFunc={submitRatingHandler} />
      </Backdrop>
    </div>
  )
}

export default AcceptedRequests
