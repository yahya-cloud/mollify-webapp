import * as api from  '../../api/index';
import {SHOWLOADER} from './actionTypes';
import {dispatchFunction} from '../Utility';


export const requestSession = (user, person) => async(dispatch) => {
        const personEmail = person.email; 
        const reqParams = {user, personEmail};
        const data = await dispatchFunction(reqParams, api.requestSession, dispatch);
        data && dispatch({type:SHOWLOADER, payload: data.message});        
}