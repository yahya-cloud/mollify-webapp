import React from 'react'
import { Grid } from '@material-ui/core'

import classes from './Card.module.css'
import Button from '../Button/Button'
import { useHistory } from 'react-router'

const Card = (props) => {
  //details to show on card
  let dataToFetch = ['name', 'email', 'phoneNumber', 'address']
  let user = props.userType
  const history = useHistory()

  //Fetching data at different instances
  const infos = []

  if (user === 'patient' && history.location.pathname === '/') {
    // when user is patient and at home page
    dataToFetch = [...dataToFetch, 'rating', 'price']
  } else if (history.location.pathname === '/acceptedRequests') {
    // when user is doctor and at accepted request page
    dataToFetch = [...dataToFetch, 'time', 'sessionType']
  } else {
    // when user is doctor and at accepted request page
    dataToFetch = [...dataToFetch, 'gender', 'disorder', 'time', 'sessionType']
  }

  dataToFetch.forEach((el, id) => {
    infos.push(
      <div key={id} className={classes.cardInfo}>
        <h3>{el.slice(0, 1).toUpperCase() + el.slice(1)}:</h3>{' '}
        <p>{props.person[el]}</p>
      </div>
    )
  })

  //takes user to navigate page
  const navigateHandler = () => {
    history.push(`/navigate/${props.person.address}`)
  }

  return (
    <Grid item xs={12} md={6}>
      <div className={`${classes.Card}`}>
        <div className={classes.cardComponent}>
          <div
            style={{ backgroundImage: `url(${props.person.photo})` }}
            className={classes.cardPhoto}></div>
          <div className={classes.infoGrid}>
            {infos.map((info) => {
              return info
            })}
          </div>
        </div>

        <div className={classes.btnBox}>
          {props.greenBtnFunc && (
            <Button
              btnType='btnCard'
              btnColor='btnGreen'
              clickHandler={() => props.greenBtnFunc(props.person)}>
              {props.greenBtnTxt}
            </Button>
          )}
          {props.navigate && (
            <>
              <Button
                btnType='btnCard'
                btnColor='btnBlue'
                clickHandler={navigateHandler}>
                Navigate
              </Button>
              <Button
                btnType='btnCard'
                btnColor='btnRed'
                clickHandler={() => props.redBtnFunc(props.person)}>
                {props.redBtnTxt}
              </Button>
            </>
          )}
        </div>
      </div>
    </Grid>
  )
}

export default Card
