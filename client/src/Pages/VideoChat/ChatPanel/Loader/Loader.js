import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > * + *': {
      marginTop: '1rem',
      width: '80%',
    },
  },
  heading: {
    fontSize: '2.5rem',
  },
}))

const Loader = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Calling...</h2>
      <LinearProgress color='secondary' />
    </div>
  )
}

export default Loader
