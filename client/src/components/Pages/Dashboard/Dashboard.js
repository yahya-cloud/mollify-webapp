import React from 'react';
import {Grid} from '@material-ui/core';
import classes from './Dashboard.module.css';
import {useSelector} from 'react-redux';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ClearIcon from '@material-ui/icons/Clear';
import StarIcon from '@material-ui/icons/Star';
import Schedule from './Schedules/Schedule/Schedule';
import Schedules from './Schedules/Schedules';

import DoughnutCard from './DoughnutCard/Doughnut';
import CardRequests from './CardRequests/CardRequests';

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
            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Clinic Session</h2>
                
                <div className={classes.iconInfo}> 
                <div className={`${classes.iconBox} ${classes.iconBox__clinic}`}><LocalHospitalIcon  style={{color: '#2E8473'}} /></div>
                <h1>{clinic}</h1>
                </div>

                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Home Session</h2>

                <div className={classes.iconInfo}> 
                <div className={`${classes.iconBox} ${classes.iconBox__home}`}><HomeIcon style={{color: '#008EB8'}} /></div>
                <h1>{home}</h1>
                </div>
       
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Failed Session</h2>
                
                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__failed}`}><ClearIcon  style={{color: '#FF1E1E'}}/></div>
                <h1>{failed}</h1>
                </div>
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Total Patients</h2>
                
                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__patients}`}><PersonIcon  style={{color: '#AD00E9'}}/></div>
                <h1>{total}</h1>
                </div>

                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Earnings</h2>

                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__earning}`}><AttachMoneyIcon  style={{color: '#94C800'}}/></div>
                <h1>₹{earnings}</h1>
                </div>


                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Mollify Rating</h2>

                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__rating}`}><StarIcon style={{color: '#FFC700'}}/></div>
                <h1>{rating}</h1>
                </div>


                </div>
            </Grid>

            {/* schedule card and pending card */}

            <Grid item xs={8}>
            <Schedules/>
            </Grid>

            <Grid item xs={4}>
             <CardRequests />
            </Grid>

            {/* pi charts and rest */}
            
            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardGraph}`} >
                <h2>Sessions Types</h2>
                <DoughnutCard
                labels={["Home","Clinic"]}
                data={[`${home}`,`${clinic}`]} 
                colors={["#008EB8", "#2E8473"]}    />

                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardGraph}`} >
                <h2>Failed and Successful</h2>
                <DoughnutCard 
                labels={["Failed","Success"]}
                data={[`${failed}`, `${total}`]} 
                colors={["#E84D54", "#25B5F1"]}   
                />
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`table ${classes.card} ${classes.cardDivision}`} >
                <h2>Patients By Disorders</h2>

                <div className={classes.subHeadings}><h3>Illness Type</h3><h3>Number </h3></div>

                {
                disorders.map(el => (
                <div className={classes.disorderInfo}>
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
