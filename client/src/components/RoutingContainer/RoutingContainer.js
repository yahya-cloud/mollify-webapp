import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
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
            <Switch>
            <Route path="/patientRequest" > <PatientRequests/> </Route>
            <Route path='/' ><Dashboard /></Route>
            </Switch>
        </>)
    }else{
        pages = (<>
            <Switch>
            <Route path="/acceptedRequests"  > <AcceptedRequests /> </Route>
            <Route path='/' ><Doctors /></Route>
            </Switch>
        </>)
    }

    return (
        <div className={classes.routingContainer}>
        <Switch>           
            <Route  path="/settings"><SettingsPage /></Route>
            <Route  path="/ourWorking"> <OurWorking/> </Route>
            <Route  path="/navigate/:personAddress" ><Navigate /></Route>

            {pages}
            {/* {user.userType === 'doctor' ? 
            (<Switch>
            <Route path="/patientRequest" exact> <PatientRequests/> </Route>
            <Route path='/' ><Dashboard /></Route>
            </Switch>
            )
            :
            (<Switch>
            <Route path="/acceptedRequests" > <AcceptedRequests /> </Route>
            <Route path='/' ><Doctors /></Route>
            </Switch>
            ) */}




            <Redirect push to="/" />
        </Switch>
        </div>
    )
}

export default RoutingContainer
