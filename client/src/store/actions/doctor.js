import * as api from '../../api/index';
import {dispatchFunction} from '../Utility';
import {AUTH} from './actionTypes';


export const acceptRequest = (user,person) => async (dispatch) => {
     const params = {user,person} ;
     const data = await dispatchFunction(params, api.acceptSession, dispatch);
     data && dispatch({type: AUTH, payload: data.result });
}

export const sessionFailed = (userEmail, personId) => async (dispatch) => {
      const params = {userEmail, personId};
      const data = await dispatchFunction(params, api.sessionFailed, dispatch);
      data && dispatch({type: AUTH, payload: data.result });
}

export const sessionSucceed = (user, person) => async (dispatch) => {
      const params = {user, person};
      const data = await dispatchFunction(params, api.sessionSucceed, dispatch);
      data && dispatch({type: AUTH, payload: data.result });
}

export const rejectRequest = (userEmail,userType, personEmail) => async(dispatch) => {
       const params = {userEmail,userType, personEmail}
       const data = await dispatchFunction(params, api.deleteRequest, dispatch);
       data && dispatch({type: AUTH, payload: data.result });
}