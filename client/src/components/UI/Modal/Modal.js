import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {hideLoader} from '../../../store/actions/modal';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './Styles';


const Modal = () => {

  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const classes = useStyles();

  const handleToggle = () => {
    dispatch(hideLoader());
  }


  return (
  <Backdrop className={classes.backdrop} open={modal.show} onClick={handleToggle}>
  {modal.msg ?
    <div className={classes.messageBox}>
    <h3>{modal.msg}</h3>
    <Button size={'large'} variant="contained" color="primary" className={classes.button}>
     ok Got it!
    </Button>
  </div> :
  <CircularProgress size={300} thickness={1.8} color="#fff" />
   }

  </Backdrop>
  )
}

export default Modal;