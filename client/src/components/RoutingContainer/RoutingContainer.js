import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import classes from './RoutingContainer.module.css'
import SettingsPage from '../../Pages/SettingsPage/SettingsPage'
import OurWorking from '../../Pages/OurWorking/OurWorking'
import Navigate from '../../Pages/Navigate/Navigate'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Doctors from '../../Pages/Doctors/Doctors'
import PatientRequests from '../../Pages/PatientRequests/PatientRequests'
import AcceptedRequests from '../../Pages/AcceptedRequests/AcceptedRequests'
import DoctorSchedulePage from '../../Pages/DoctorSchedulePage/DoctorSchedulePage'
import Chat from '../../Pages/Chat/Chat'
import PatientSchedulePage from '../../Pages/PatientSchedulePage/PatientSchedulePage'
import VideoChat from '../../Pages/VideoChat/VideoChat'

// function to show doctor/ patient pages conditionally
const RoutingContainer = (props) => {
  let pages = null

  if (props.userType === 'doctor') {
    //parent switch not working because of empty tag
    pages = (
      <>
        <Switch>
          <Route path='/patientRequest'>
            <PatientRequests />
          </Route>
          <Route path='/schedule'>
            <DoctorSchedulePage />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </>
    )
  } else {
    pages = (
      <>
        <Switch>
          <Route path='/acceptedRequests'>
            <AcceptedRequests />
          </Route>
          <Route path='/schedule'>
            <PatientSchedulePage />
          </Route>
          <Route path='/'>
            <Doctors />
          </Route>
        </Switch>
      </>
    )
  }

  return (
    <div className={classes.routingContainer}>
      <Switch>
        <Route path='/settings'>
          <SettingsPage />
        </Route>
        <Route path='/ourWorking'>
          <OurWorking />
        </Route>
        <Route path='/navigate/:personAddress'>
          <Navigate />
        </Route>

        <Route path='/chat'>
          <Chat />
        </Route>

        <Route path='/videoChat/:chatId'>
          <VideoChat />
        </Route>

        {pages}

        <Redirect push to='/' />
      </Switch>
    </div>
  )
}

export default RoutingContainer
