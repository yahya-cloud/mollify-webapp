import * as api from  '../../api/index';
import {AUTH, LOGOUT} from './actionTypes';

export const signIn = (formData) => async(dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, payload: data.result });
     

    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, history) => async(dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        console.log(data);
        dispatch({type: AUTH, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const logOut = (history) => {
    history.push('/');
    return{type:LOGOUT}
} 