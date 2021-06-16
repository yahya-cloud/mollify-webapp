import React, { useState } from 'react'
import { Grid } from '@material-ui/core'

import classes from './Card.module.css'
import Button from '../Button/Button'
import CardInputs from './CardInputs/CardInputs'
import { useHistory } from 'react-router'

const Card = (props) => {
  //details to show on card
  let dataToFetch = ['name', 'email', 'phoneNumber', 'address']
  let user = props.userType
  const history = useHistory()

  const [data, setData] = useState({
    personData: props.person,
    inputData: {
      time: '',
      sessionType: 'Home',
      gender: 'Male',
      disorder: 'Anxiety',
    },
  })

  //changeHandler while user entering the data
  const changeHandler = (e) => {
    let updatedData = { ...data }
    updatedData.inputData[e.target.name] = e.target.value
    setData(updatedData)
  }

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
    history.push(`/navigate/${data.personData.address}`)
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
        {props.showInputs && <CardInputs changeHandler={changeHandler} />}

        <div className={classes.btnBox}>
          {props.greenBtnFunc && (
            <Button
              btnType='btnCard'
              btnColor='btnGreen'
              clickHandler={() => props.greenBtnFunc(data)}>
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
                clickHandler={() => props.redBtnFunc(data)}>
                {props.redBtnTxt}
              </Button>{' '}
            </>
          )}
        </div>
      </div>
    </Grid>
  )
}

export default Card
