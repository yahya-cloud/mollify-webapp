import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as api from '../../../api/index';

import {HIDELOADER, SHOWLOADER} from '../../../store/actions/actionTypes';
import {requestSession} from '../../../store/actions/patient';
import GridContainer from '../../GridContainer/GridContainer';

const Doctors = () => {

    const [doctors, setDoctors] = useState(null);
    const dispatch  =  useDispatch();
    const  {user} = useSelector(state => state); 


    const requestHandler = (data) => {
        const userData = {...user, ...data.inputData}
        dispatch(requestSession(userData, data.personData));
    }

    useEffect(() => {
        (async function getDoctors() {
           dispatch({type:SHOWLOADER});
           let {data} = await api.getDoctors();
           dispatch({type: HIDELOADER});
           setDoctors(data.result);
        })();
    }, [dispatch]);

    return (<>
         {doctors !== null ? 
         <GridContainer 
         cardArray={doctors}
          userType='patient' 
          showInputs={true}
          greenBtnTxt="Request Session"
          greenBtnFunc={requestHandler}
        /> : null }
    </>
    )
    
}

export default React.memo(Doctors);