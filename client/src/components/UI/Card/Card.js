import React from 'react';

import {Grid} from '@material-ui/core';
import classes from './Card.module.css';
import photo from '../../../assets/person.jpg';
import Button from '../Button/Button';

const Card = (props) => {
    const data = {Name: "Mohd. yahya", Time: "9 -10 am", Disorder: 'Stress', Type: "Home", Gender: "Male", Address:"149-d j&k pocket Dilshad garden" };

    const infos = [];

    for(let key in data){
         infos.push(
             <div className={classes.cardInfo}>
             <h3>{key}:</h3> <p>{data[key]}</p> 
             </div>
         )
    }

    return (
        <Grid item xs={12} md={4} lg={6} >
            <div className={`${classes.Card}`} >
            
            <div className={classes.cardComponent}>
            <div style={{backgroundImage: `url(${photo})`}} className={classes.cardPhoto}></div>
            <div  className={classes.infoGrid}>
            {infos.map(info => {return info})}
            </div>
            </div>

            <div className={classes.btnBox}>
            <Button btnType="btnCard" btnColor="btnGreen" >Accept request</Button>
            {props.navigate && <Button btnType="btnCard" btnColor="btnBlue" >Navigate</Button>}
            <Button btnType="btnCard" btnColor="btnRed" >Reject request</Button>
            </div>  
            
                    
            </div>
        </Grid>
    )
}

export default Card
