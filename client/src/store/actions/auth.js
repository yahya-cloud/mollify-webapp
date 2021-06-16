import * as api from '../../api/index'
import { USER, LOGOUT, SHOWLOADER } from './actionTypes'
import { loaderFunction } from '../Utility'


//if condition in every function because loaderFuntion will not return data if there's error
export const signIn = (formData) => async (dispatch) => {
  const data = await loaderFunction(formData, api.signIn, dispatch)
  if (data) {
    dispatch({ type: USER, payload: data.result })
    localStorage.setItem('userToken', data.token)
  }
}

export const signUp = (formData) => async (dispatch) => {
  const data = await loaderFunction(formData, api.signUp, dispatch)
  if (data) {
    dispatch({ type: USER, payload: data.result })
    localStorage.setItem('userToken', data.token)
  }
}

export const logOut = (history) => {
  history.push('/')
  localStorage.clear()
  return { type: LOGOUT }
}

export const getUser = (email) => async (dispatch) => {
  const data = await loaderFunction({ email }, api.getUser, dispatch)
  if (data) {
    dispatch({ type: USER, payload: data.result })
  }
}

export const updateUser = (params) => async (dispatch) => {
  const data = await loaderFunction(params, api.updateUser, dispatch)
  if (data) {
    dispatch({ type: SHOWLOADER, payload: data.message })
    dispatch({ type: USER, payload: data?.result })
  }
}

export const deleteUser = (id, userType) => async (dispatch) => {
  const { data } = await api.deleteUser(id, userType)
  if (data) {
    dispatch({ type: SHOWLOADER, payload: data.message })
    dispatch({ type: USER, payload: '' })
    localStorage.clear()
  }
}
