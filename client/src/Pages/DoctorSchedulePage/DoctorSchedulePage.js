import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Schedule from '../../components/Schedule/Schedule'
import { sessionSucceed, sessionFailed } from '../../store/actions/doctor'

const DoctorSchedulePage = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const sessionSucceedHandler = (data) => {
    dispatch(sessionSucceed(data))
  }

  const sessionFailedHandler = (id) => {
    if (user.userType === 'doctor') {
      dispatch(sessionFailed(id))
    }
  }

  return (
    <Schedule
      user={user}
      greenBtnFunc={sessionSucceedHandler}
      redBtnFunc={sessionFailedHandler}
    />
  )
}

export default DoctorSchedulePage
