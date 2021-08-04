import React, { useState } from 'react'
import StarIcon from '@material-ui/icons/Star'
import Button from '@material-ui/core/Button'
import { IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import classes from './RateCard.module.css'

const RateCard = (props) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const submitHandler = () => {
    props.btnFunc(rating)
    setRating(0)
  }

  return (
    <div className={classes.ratingBox}>
      <IconButton
        onClick={() => props.closeForm()}
        color='secondary'
        aria-label='delete'
        className={classes.closeButton}
        size='small'>
        <CancelIcon fontSize='medium' />
      </IconButton>
      <h1>Please Rate the Doctor</h1>
      <div className={classes.starContainer}>
        {/* 5 star rating  */}
        {[...Array(5)].map((star, i) => {
          let ratingValue = i + 1
          let color = ratingValue <= (hover || rating) ? '#ffc107' : '#C9C9CC'
          return (
            <label key={i}>
              <input
                type='radio'
                name='rating'
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <StarIcon
                className={classes.ratingStar}
                fontSize='large'
                style={{ color: `${color}`, fontSize: 2000 }}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        })}
      </div>
      <Button
        size='large'
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={submitHandler}>
        Submit Rating
      </Button>
    </div>
  )
}

export default RateCard
