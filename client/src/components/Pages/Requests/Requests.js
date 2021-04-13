import React from 'react';
import {useSelector} from 'react-redux';

import {Grid} from '@material-ui/core' 
import Card from '../../UI/Card/Card';

const Requests = () => {
    const {userData} =  useSelector(state => state);
    console.log(userData);
    return (
        <div className='root'>
        <Grid className='gridContainer'  container spacing={4}>
            <Card navigate/>
            <Card />
            
        </Grid>
        </div>
    )
}

export default Requests;
