import React, { useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';


import classes from './RateCard.module.css';

const RateCard = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(0);

    return (
        <div className={classes.ratingBox}>
        <h1>Please Rate the Doctor</h1>
        <div className={classes.starContainer}>
        {
            [...Array(5)].map((star, i) =>{
                let ratingValue = i + 1;
                let color = ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9";
                return (
                <label>
                <input 
                type='radio'
                name='rating'
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                />
                <StarIcon 
                fontSize='large'
                style={{color:`${color}`, fontSize:'50'}}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                />
                </label>
                )
            })
        }
        </div>
        <Button size={'large'} variant="contained" color="primary" className={classes.button}>
        ok Got it!
        </Button>
        </div>
    )
}

export default RateCard;
