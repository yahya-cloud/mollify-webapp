import React from 'react'

import classes from './InfoCards.module.css'
import { Grid } from '@material-ui/core'

import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import ClearIcon from '@material-ui/icons/Clear'
import StarIcon from '@material-ui/icons/Star'
import ComputerIcon from '@material-ui/icons/Computer'

const InfoCards = (props) => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <div className={`${classes.card} ${classes.cardInfo}`}>
          <h2>Clinic Session</h2>

          <div className={classes.iconInfo}>
            <div className={`${classes.iconBox} ${classes.iconBox__clinic}`}>
              <LocalHospitalIcon style={{ color: '#2E8473' }} />
            </div>
            <h1>{props.clinic}</h1>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <div className={`${classes.card} ${classes.cardInfo}`}>
          <h2>Home Session</h2>

          <div className={classes.iconInfo}>
            <div className={`${classes.iconBox} ${classes.iconBox__home}`}>
              <HomeIcon style={{ color: '#008EB8' }} />
            </div>
            <h1>{props.home}</h1>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <div className={`${classes.card} ${classes.cardInfo}`}>
          <h2>Virtual Session</h2>

          <div className={classes.iconInfo}>
            <div className={`${classes.iconBox} ${classes.iconBox__failed}`}>
              <ComputerIcon style={{ color: 'rgb(255 156 156)' }} />
            </div>
            <h1>{props.virtual}</h1>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <div className={`${classes.card} ${classes.cardInfo}`}>
          <h2>Total Patients</h2>

          <div className={classes.iconInfo}>
            <div className={`${classes.iconBox} ${classes.iconBox__patients}`}>
              <PersonIcon style={{ color: '#AD00E9' }} />
            </div>
            <h1>{props.total}</h1>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <div className={`${classes.card} ${classes.cardInfo}`}>
          <h2>Earnings</h2>

          <div className={classes.iconInfo}>
            <div className={`${classes.iconBox} ${classes.iconBox__earning}`}>
              <AttachMoneyIcon style={{ color: '#94C800' }} />
            </div>
            <h1>₹{props.earnings}</h1>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <div className={`${classes.card} ${classes.cardInfo}`}>
          <h2>Mollify Rating</h2>

          <div className={classes.iconInfo}>
            <div className={`${classes.iconBox} ${classes.iconBox__rating}`}>
              <StarIcon style={{ color: '#FFC700' }} />
            </div>

            {[...Array(5)].map((star, i) => {
              let color = props.rating - 1 >= i ? '#ffc107' : '#C9C9CC'
              return (
                <StarIcon
                  key={i}
                  className={classes.ratingStar}
                  fontSize='large'
                  style={{ color: `${color}`, fontSize: '80' }}
                />
              )
            })}
          </div>
        </div>
      </Grid>
    </>
  )
}

export default InfoCards
