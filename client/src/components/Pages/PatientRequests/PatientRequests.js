import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import GridContainer from '../../GridContainer/GridContainer';
import {acceptRequest, rejectRequest} from '../../../store/actions/doctor';


const PatientRequests = () => {

    const {user} = useSelector(state => state);
    const dispatch = useDispatch();

    const acceptRequestHandler = (data) => {
        dispatch(acceptRequest(user,data.personData));
    }

    const rejectRequestHandler = (data) => {
        dispatch(rejectRequest(user.email, user.userType, data.personData.email));
    }    


    return (
    <GridContainer 
    cardArray={user.requests}
    userType="doctor"
    greenBtnFunc={acceptRequestHandler}
    redBtnFunc={rejectRequestHandler} 
    greenBtnTxt="Accept Request"
    redBtnTxt="Delete Request" />
    )
}

export default PatientRequests
