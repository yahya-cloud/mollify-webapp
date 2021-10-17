import * as api from '../../api/index'
import { SHOWLOADER, USER } from './actionTypes'
import { loaderFunction } from '../../utils/loaderFunction'

export const requestSession = (user, doctor) => async (dispatch) => {
  const doctorId = doctor._id

  const reqParams = { user, doctorId }
  console.log(reqParams)
  const data = await loaderFunction(reqParams, api.requestSession, dispatch)
  if (data) {
    dispatch({ type: SHOWLOADER, payload: data.message })
  }
}

export const sessionCompleted = (params) => async (dispatch) => {
  const data = await loaderFunction(params, api.sessionCompleted, dispatch)
  if (data) {
    dispatch({ type: USER, payload: data.result })
    dispatch({ type: SHOWLOADER, payload: 'Response have been Recorded' })
  }
}
