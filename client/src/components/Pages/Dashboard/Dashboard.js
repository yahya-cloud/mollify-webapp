import React from 'react';
import {Grid} from '@material-ui/core';
import classes from './Dashboard.module.css';
import {useSelector} from 'react-redux';


import Schedules from './Schedules/Schedules';

import DoughnutCard from './DoughnutCard/Doughnut';
import CardRequests from './CardRequests/CardRequests';
import InfoCards from './InfoCards/InfoCards';

const Dashboard = () => {

    const user = useSelector(state => state.user);
    
    const {clinic, home, failed, total} = user.sessions;
    const {earnings, rating} = user;
    const disorders = [];
    for(let disorder in user.disorders){
        disorders.push(disorder);
    }
    return (
        <div className='root'>
            <Grid className='gridContainer'  container spacing={4}>

            {/* info cards  */}
           <InfoCards clinic = {clinic} home = {home} earnings = {earnings} rating = {rating} total = {total} failed = {failed}/>
 

            {/* schedule card and pending card */}

            <Grid item xs={12} md={8}>
            <Schedules/>
            </Grid>

            <Grid item xs={12} md={4}>
             <CardRequests />
            </Grid>

            {/* pi charts and rest */}
            
            <Grid item xs={12} md={4}>
                <div className={`${classes.card} ${classes.cardGraph}`} >
                <h2>Sessions Types</h2>
                <DoughnutCard
                labels={["Home","Clinic"]}
                data={[`${home}`,`${clinic}`]} 
                colors={["#008EB8", "#2E8473"]}    />

                </div>
            </Grid>

            <Grid item xs={12} md={4}>
                <div className={`${classes.card} ${classes.cardGraph}`} >
                <h2>Failed and Successful</h2>
                <DoughnutCard 
                labels={["Failed","Success"]}
                data={[`${failed}`, `${total}`]} 
                colors={["#E84D54", "#25B5F1"]}   
                />
                </div>
            </Grid>

            <Grid item xs={12} md={4}>
                <div className={`table ${classes.card} ${classes.cardDivision}`} >
                <h2>Patients By Disorders</h2>

                <div className={classes.subHeadings}><h3>Illness Type</h3><h3>Number </h3></div>

                {
                disorders.map(el => (
                <div key={el} className={classes.disorderInfo}>
                <h3>{el.slice(0,1).toUpperCase() + el.slice(1)}</h3>
                <p> {user.disorders[el]}</p>
                </div>
                ))
                }
               
                </div>
            </Grid>
            

            </Grid>
        </div>
    )
}

export default Dashboard;
