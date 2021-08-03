import React from 'react'

import Img from '../../../assets/selectChat.png'
import classes from './SelectChat.module.css'

const SelectChat = (props) => {
  return (
    <div className={classes.imgBox}>
      <img className={classes.img} src={Img} alt='No data png' />
      <h1>{props.text}</h1>
    </div>
  )
}

export default SelectChat
