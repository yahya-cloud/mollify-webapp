import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles } from '@material-ui/core/styles'

import * as api from '../../api/index'

import { HIDELOADER, SHOWLOADER } from '../../store/actions/actionTypes'
import { requestSession } from '../../store/actions/patient'
import GridContainer from '../../components/GridContainer/GridContainer'
import CardInputs from './CardInputs/CardInputs'
import Meta from '../../components/Meta/Meta'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const Doctors = () => {
  const [doctors, setDoctors] = useState(null)
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)

  const dispatch = useDispatch()
  const classes = useStyles()

  //function to show the form to make session
  const requestFormHandler = (personData) => {
    setData(personData)
    setShow(true)
  }

  //function to make session request
  const requestSessionHandler = (inputData) => {
    setShow(false)
    const userData = { ...inputData }
    dispatch(requestSession(userData, data))
  }

  //api call to show all doctors
  useEffect(() => {
    ;(async function getDoctors() {
      dispatch({ type: SHOWLOADER })
      let { data } = await api.getDoctors()
      dispatch({ type: HIDELOADER })
      setDoctors(data.result)
    })()
  }, [dispatch])

  return (
    <>
      {doctors !== null ? (
        <>
          <Meta title='Mollify | Doctors' />
          <GridContainer
            cardArray={doctors}
            userType='patient'
            showInputs={true}
            greenBtnTxt='Request Session'
            greenBtnFunc={requestFormHandler}
          />
          <Backdrop open={show} className={classes.backdrop}>
            <CardInputs
              closeForm={setShow}
              submitFunction={requestSessionHandler}
            />
          </Backdrop>
        </>
      ) : null}
    </>
  )
}

export default React.memo(Doctors)
