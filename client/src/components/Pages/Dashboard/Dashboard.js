import React from 'react';
import {Grid} from '@material-ui/core';
import classes from './Dashboard.module.css';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ClearIcon from '@material-ui/icons/Clear';
import StarIcon from '@material-ui/icons/Star';
import Schedule from './Schedule/Schedule';

import photo from '../../../assets/person.jpg'
import DoughnutCard from './DoughnutCard/Doughnut';

const Dashboard = () => {
    return (
        <div className='root'>
            <Grid className='gridContainer'  container spacing={4}>
            
            {/* info cards  */}
            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Clinic Session</h2>
                
                <div className={classes.iconInfo}> 
                <div className={`${classes.iconBox} ${classes.iconBox__clinic}`}><LocalHospitalIcon  style={{color: '#2E8473'}} /></div>
                <h1>235</h1>
                </div>

                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Home Session</h2>

                <div className={classes.iconInfo}> 
                <div className={`${classes.iconBox} ${classes.iconBox__home}`}><HomeIcon style={{color: '#008EB8'}} /></div>
                <h1>42</h1>
                </div>
       
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Failed Session</h2>
                
                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__failed}`}><ClearIcon  style={{color: '#FF1E1E'}}/></div>
                <h1>10</h1>
                </div>
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Total Patients</h2>
                
                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__patients}`}><PersonIcon  style={{color: '#AD00E9'}}/></div>
                <h1>67</h1>
                </div>

                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Earnings</h2>

                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__earning}`}><AttachMoneyIcon  style={{color: '#94C800'}}/></div>
                <h1>₹9600</h1>
                </div>


                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardInfo}`} >
                <h2>Mollify Rating</h2>

                <div className={classes.iconInfo}>
                <div className={`${classes.iconBox} ${classes.iconBox__rating}`}><StarIcon style={{color: '#FFC700'}}/></div>
                <h1>4.3</h1>
                </div>


                </div>
            </Grid>

            {/* schedule card and pending card */}

            <Grid item xs={8}>
                <div className={`table ${classes.card} ${classes.cardSchedule}`} >
                <h2>Todays Schedule</h2>

                <div className={classes.subHeadings}>
                <h3>Profile</h3>
                <h3>Session Type</h3>
                <h3>Session Time</h3>
                <h3>Succeed/Failed</h3>
                </div>
                <Schedule photo={photo} name="Ava Adams"  infos={['Home', '3 - 5 pm']} schedule/>
                <Schedule photo={photo} name="Ava Adams"  infos={['Home', '3 - 5 pm']} schedule/>
                <Schedule photo={photo} name="Ava Adams"  infos={['Home', '3 - 5 pm']} schedule/>
                <Schedule photo={photo} name="Ava Adams"  infos={['Home', '3 - 5 pm']} schedule/>


                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={` table ${classes.card} ${classes.cardRequests}`} >
                
                <h2>Pending Requests</h2>

                <div className={classes.subHeadings}>
                <h3>Profile</h3><h3>Time</h3><h3>Accept/Reject</h3>
                </div>
                <Schedule photo={photo} name="Ava Adams"  infos={['3 - 5 pm']} />
                <Schedule photo={photo} name="Ava Adams"  infos={['3 - 5 pm']} />
                <Schedule photo={photo} name="Ava Adams"  infos={['3 - 5 pm']} />
                <Schedule photo={photo} name="Ava Adams"  infos={['3 - 5 pm']} />


                </div>
            </Grid>

            {/* pi charts and rest */}
            
            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardGraph}`} >
                <h2>Sessions Types</h2>
                <DoughnutCard
                labels={["Home","Clinic"]}
                data={[34, 66]} 
                colors={["#008EB8", "#2E8473"]}    />

                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${classes.card} ${classes.cardGraph}`} >
                <h2>Patiets By Gender</h2>
                <DoughnutCard 
                labels={["Males","females"]}
                data={[34, 66]} 
                colors={["#E84D54", "#25B5F1"]}   
                />
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`table ${classes.card} ${classes.cardDivision}`} >
                <h2>Patients By Disorders</h2>

                <div className={classes.subHeadings}><h3>Illness Type</h3><h3>Number </h3></div>

                <div className={classes.disorderInfo}>
                    <h3>Anxiety Disorder</h3>
                    <p>345</p>
                </div>

               
                </div>
            </Grid>
            

            </Grid>
        </div>
    )
}

export default Dashboard
