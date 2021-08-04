import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Form from '../../components/Form/Form'
import { signUp, signIn } from '../../store/actions/auth'
import classes from './Register.module.css'
import FormImage from '../../assets/form.png'
import Meta from '../../components/Meta/Meta'

const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (body) => {
    if (isSignUp) {
      dispatch(signUp(body))
    } else {
      dispatch(signIn(body))
    }
  }

  const signUpHandler = () => {
    setIsSignUp((prevState) => !prevState)
  }

  return (
    <div className={classes.registerContainer}>
      <Meta />
      <img className={classes.sideImg} src={FormImage} alt='form' />

      <div className={classes.container2}>
        <h1>{isSignUp ? 'Sign Up with Mollify' : 'Welcome Back'}</h1>
        <Form signup={isSignUp} handleSubmit={handleSubmit} />
        <button className={classes.button} onClick={signUpHandler}>
          {isSignUp ? 'or SignIn' : 'or Signup'}
        </button>
      </div>
    </div>
  )
}

export default Register
