import React from 'react'

import Img from '../../../assets/selectVideo.png'
import classes from './SelectVideo.module.css'

const SelectVideo = (props) => {
  return (
    <div className={classes.imgBox}>
      <img className={classes.img} src={Img} alt='No data png' />
      <h1>{props.text}</h1>
    </div>
  )
}

export default SelectVideo
