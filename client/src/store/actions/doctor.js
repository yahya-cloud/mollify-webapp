import * as api from '../../api/index'
import { loaderFunction } from '../Utility'
import { USER } from './actionTypes'

export const acceptRequest = (user, person) => async (dispatch) => {
  const params = { user, person }
  const data = await loaderFunction(params, api.acceptSession, dispatch)
  dispatch({ type: USER, payload: data.result })
}

export const sessionFailed = (personId) => async (dispatch) => {
  const params = { personId }
  const data = await loaderFunction(params, api.sessionFailed, dispatch)
  dispatch({ type: USER, payload: data.result })
}

export const sessionSucceed = (person) => async (dispatch) => {
  const params = { person }
  const data = await loaderFunction(params, api.sessionSucceed, dispatch)
  dispatch({ type: USER, payload: data.result })
}

export const rejectRequest = (id) => async (dispatch) => {
  const params = { id }
  const data = await loaderFunction(params, api.deleteRequest, dispatch)
  dispatch({ type: USER, payload: data.result })
}
