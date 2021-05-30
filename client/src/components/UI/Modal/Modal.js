import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {hideLoader} from '../../../store/actions/modal';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './Styles';


const Modal = () => {

  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  const handleToggle = () => {
    dispatch(hideLoader());
  }


  return (
  <Backdrop className={classes.backdrop} open={modal.show} >
  {modal.msg ?
    <div className={classes.messageBox} style={matches ? {width:'80%', height: '40%'} : null}>
    <h3>{modal.msg}</h3>
    <Button onClick={handleToggle} size={'large'} variant="contained" color="primary" className={classes.button}>
     ok Got it!
    </Button>
  </div> :
  <CircularProgress size={300} thickness={1.8}   style={{color:'#fff'}}/>
   }

  </Backdrop>
  )
}

export default Modal;