import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GridContainer from '../../components/GridContainer/GridContainer'
import Meta from '../../components/Meta/Meta'
import { acceptRequest, rejectRequest } from '../../store/actions/doctor'

const PatientRequests = () => {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()

  const acceptRequestHandler = (data) => {
    dispatch(acceptRequest(user, data))
  }

  const rejectRequestHandler = (data) => {
    dispatch(rejectRequest(data._id))
  }

  return (
    <>
      <Meta title='Mollify | Patient Requests' />
      <GridContainer
        cardArray={user.requests}
        userType='doctor'
        greenBtnFunc={acceptRequestHandler}
        redBtnFunc={rejectRequestHandler}
        greenBtnTxt='Accept Request'
        redBtnTxt='Delete Request'
      />
    </>
  )
}

export default PatientRequests
