import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux'; 

import classes from './RoutingContainer.module.css';
import SettingsPage from '../Pages/SettingsPage/SettingsPage';
import OurWorking from '../Pages/OurWorking/OurWorking';
import Navigate from '../Pages/Navigate/Navigate';
import Dashboard from '../Pages/Dashboard/Dashboard'
import Doctors from '../Pages/Doctors/Doctors';
import PatientRequests from '../Pages/PatientRequests/PatientRequests';
import AcceptedRequests from '../Pages/AcceptedRequests/AcceptedRequests';

const RoutingContainer = () => {
    const {user} =  useSelector(state => state);
    let pages = null;

    if(user.userType === 'doctor'){
        pages = (<>
            <Route path="/patientRequest"> <PatientRequests/> </Route>
            <Route path='/' exact><Dashboard /></Route>
        </>)
    }else{
        pages = (<>
            <Route path="/acceptedRequests"> <AcceptedRequests /> </Route>
            <Route path='/' exact><Doctors /></Route>
        </>)
    }

    return (
        <div className={classes.routingContainer}>
        <Switch>           
            <Route  path="/settings"><SettingsPage /></Route>
            <Route  path="/ourWorking"> <OurWorking/> </Route>
            <Route  path="/navigate/:personAddress" ><Navigate /></Route>
            {pages}
        </Switch>
        </div>
    )
}

export default RoutingContainer
