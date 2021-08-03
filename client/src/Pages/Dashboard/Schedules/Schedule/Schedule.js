import React from 'react'

import Button from '../../../../components/UI/Button/Button'
import classes from './Schedule.module.css'

const Schedule = (props) => {
  let sessionType
  const { photo, time, name } = props.personData
  if (props.schedule && props.width > 600) {
    sessionType = props.personData.sessionType
  }

  return (
    <div className={classes.schedule}>
      <div className={classes.imgBox}>
        <span style={{ backgroundImage: `url(${photo})` }}></span>
        <p>{name}</p>
      </div>

      <p>{`${new Date(time).getHours()}: ${new Date(time).getMinutes()}`}</p>
      {props.schedule && <p>{sessionType}</p>}

      <div className={classes.btnBox}>
        <Button
          clickHandler={() => props.greenBtnFunc(props.personData)}
          btnType='btnAccept--small'>
          {props.schedule ? 'succeed' : 'Accept'}
        </Button>
        <Button
          clickHandler={() => props.redBtnFunc(props.personData)}
          btnType='btnReject--small'>
          {props.schedule ? 'Failed' : 'Reject'}
        </Button>
      </div>
    </div>
  )
}

export default Schedule
