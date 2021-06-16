import React from 'react'
import { Grid } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import Card from '../UI/Card/Card'
import NoData from '../UI/NoData/NoData'

const GridContainer = (props) => {
  let navigate = true
  navigate = !(
    useHistory().location.pathname === '/' && props.userType === 'patient'
  )

  return (
    <>
      {props.cardArray.length !== 0 ? (
        <div className='root'>
          <Grid className='gridContainer' container spacing={4}>
            {props.cardArray.map((el, id) => {
              return (
                <Card
                  key={id}
                  showInputs={props.showInputs}
                  person={el}
                  navigate={navigate}
                  userType={props.userType}
                  greenBtnFunc={props.greenBtnFunc}
                  redBtnFunc={props.redBtnFunc}
                  greenBtnTxt={props.greenBtnTxt}
                  redBtnTxt={props.redBtnTxt}
                />
              )
            })}
          </Grid>
        </div>
      ) : (
        <NoData text='You have no pending requests' />
      )}
    </>
  )
}

export default GridContainer
