import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { acceptRequest, rejectRequest } from '../../../store/actions/doctor'
import classes from './CardRequests.module.css'
import Schedule from '../Schedules/Schedule/Schedule'

const CardRequests = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const acceptRequestHandler = (data) => {
    dispatch(acceptRequest(user, data))
  }

  const rejectRequestHandler = (data) => {
    dispatch(rejectRequest(data._id))
  }

  return (
    <div className={` table ${classes.card} ${classes.cardRequests}`}>
      <h2>Pending Requests</h2>

      <div className={classes.subHeadings}>
        <h3>Profile</h3>
        <h3>Time</h3>
        <h3>Accept/Reject</h3>
      </div>
      {user.requests.map((el) => {
        return (
          <Schedule
            key={el._id}
            personData={el}
            greenBtnFunc={acceptRequestHandler}
            redBtnFunc={rejectRequestHandler}
          />
        )
      })}
    </div>
  )
}

export default CardRequests
