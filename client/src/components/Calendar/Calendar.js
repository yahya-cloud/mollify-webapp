import React from 'react'
import FullCalendar, { parseClassNames } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Calendar.css';


const Calender = (props) => {
  return (
    <div className='calendarContainer'>
      <FullCalendar
        titleFormat={{ year: 'numeric', month: 'long' }}
        headerToolbar={{
          start: 'dayGridMonth, dayGridWeek',
          center: 'title',
          end: 'today prev, next',
        }}
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={props.events}
        eventColor='#378006'
      />
    </div>
  )
}

export default Calender
