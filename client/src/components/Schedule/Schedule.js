import React from 'react'
import Calendar from '../Calendar/Calendar'
import ScheduleTable from './ScheduleTable/ScheduleTable'

import NoData from '../UI/NoData/NoData'

const Schedule = ({user, redBtnFunc, greenBtnFunc}) => {

  let events = user.schedules.map((el) => {
    return {
      start: new Date(el.time),
      title: `${el.sessionType} Session`,
    }
  })

  return (
    <>
      {user.schedules.length !== 0 ? (
        <div>
          <h1 className='headingPrimary'>Schedule Table</h1>
          <ScheduleTable
            redBtnFunc={redBtnFunc}
            greenBtnFunc={greenBtnFunc}
            rows={user.schedules}
          />
          <h1 className='headingPrimary'>Schedule Calendar</h1>
          <Calendar events={events} />
        </div>
      ) : (
        <NoData text='You have nothing in your Schedule' />
      )}
    </>
  )
}

export default Schedule
