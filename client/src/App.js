import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory,Route, Switch } from 'react-router-dom';


import Register from './components/Pages/Register/Register';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Requests from './components/Pages/Requests/Requests';
import SettingsPage from './components/Pages/SettingsPage/SettingsPage';
import OurWorking from './components/Pages/OurWorking/OurWorking';
import Navigate from './components/Pages/Navigate/Navigate';

import classes from './App.module.css';

const App = () => {

    const user =  useSelector(state => state);
    const history = useHistory();
    console.log(user);


    return (
        <div className='appContainer'>
        {!user.userData ? <Route  path="/" ><Register /></Route> :
       <div className={classes.mainContainer}>
       <Header />
        <Navbar />
        <div className={classes.routingContainer}>
        <Switch>           
            <Route  path="/patientRequest"><Requests /></Route>
            <Route  path="/settings"><SettingsPage /></Route>
            <Route  path="/ourWorking"> <OurWorking/> </Route>
            <Route  path="/navigate"> <Navigate/> </Route>
          
            <Route  path="/" >
        
            {user.userData.userType === 'doctor' ?
            <Dashboard />
            :
            <Requests />
            }
            </Route> :

        </Switch>
        </div>
        </div>
        }


      
        </div>
    )
}

export default React.memo(App)
