import * as api from  '../../api/index';
import {AUTH,  LOGOUT, SHOWLOADER} from './actionTypes';
import {dispatchFunction} from '../Utility';



export const signIn = (formData) =>  async (dispatch) => {
   const data = await dispatchFunction(formData, api.signIn, dispatch);
   data && dispatch({type: AUTH, payload: data.result})
   data && localStorage.setItem('userToken', data.token);
}

export const signUp = (formData) => async(dispatch) => {
    const data = await dispatchFunction(formData, api.signUp, dispatch);
    data && dispatch({type: AUTH, payload: data.result});
    data && localStorage.setItem('userToken', data.token);
}

export const logOut = (history) => {
    history.push('/');
    localStorage.clear();
    return{type:LOGOUT}
} 

export const getUser = (email) => async(dispatch) => {
        const data = await dispatchFunction({email}, api.getUser, dispatch);
        data && dispatch({type: AUTH, payload: data});
}

export const updateUser = (params) => async(dispatch) => {
    const data = await dispatchFunction(params, api.updateUser, dispatch);
    data && dispatch({type:SHOWLOADER, payload: data.message}); 
    data && dispatch({type: AUTH, payload: data.result});
}
