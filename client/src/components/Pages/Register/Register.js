import React, { useState } from 'react';
import {useDispatch} from 'react-redux';

import Form from '../../Form/Form';
import {signUp, signIn} from '../../../store/actions/auth';
import {showLoader} from '../../../store/actions/modal';

import classes from './Register.module.css';


const Register = () => {

    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (body) => {
        if(isSignUp){
        dispatch(signUp(body));
        }else{
            dispatch(signIn(body));
        }
    };

    return (
        <div className={classes.registerContainer}>
        <div className={`formContainer ${classes.formContainer}`}>
        <h1>{isSignUp ? 'Get registered in Mollify' : 'Welcome back to Mollify' }</h1>
        <Form signup={isSignUp} handleSubmit={handleSubmit}/>
        <button className={classes.button} onClick={() => setIsSignUp(prevState => !prevState)}>{isSignUp ? 'or SignIn' : 'or Signup'}</button>
        </div>
        </div>
    )
}

export default Register
