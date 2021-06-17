import * as api from '../../api/index'
import { SHOWLOADER } from './actionTypes'
import { loaderFunction } from '../Utility'

export const requestSession = (user, doctor) => async (dispatch) => {
  const doctorEmail = doctor.email
  const reqParams = { user, doctorEmail }
  const data = await loaderFunction(reqParams, api.requestSession, dispatch)
  if (data) {
    dispatch({ type: SHOWLOADER, payload: data.message })
  }
}

export const submitRating = (params) => async (dispatch) => {
  const data = await loaderFunction(params, api.submitRating, dispatch)
  if (data) {
    dispatch({ type: SHOWLOADER, payload: data.message })
  }
}
