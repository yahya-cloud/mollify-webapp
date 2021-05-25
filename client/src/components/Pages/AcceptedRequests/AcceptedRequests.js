import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import {rejectRequest} from '../../../store/actions/doctor';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import GridContainer from '../../GridContainer/GridContainer';
import NoData from '../../UI/NoData/NoData';
import RateCard from './RateCard/RateCard';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AcceptedRequests = (props) => {

    const {user} = useSelector(state => state);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const sessionCompleteHandler = (data) => {
       dispatch(rejectRequest(user.email,user.userType, data.personData.email))
    }


    return (
    <div>
    {user.acceptedRequests.length === 0 ?
      <NoData text="You have no Accepted requests"/>
      :
      <GridContainer 
        cardArray={user.acceptedRequests}
        userType="patient"
        redBtnFunc ={sessionCompleteHandler} 
        redBtnTxt="Session Completed"
       />    
    }
    <Backdrop open={true} className={classes.backdrop}>
       <RateCard />
    </Backdrop>
    </div>
    )
}

export default AcceptedRequests;
