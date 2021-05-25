import {SHOWLOADER, HIDELOADER} from '../actions/actionTypes';

export const showLoader = (message) => {
    return{type: SHOWLOADER, payload: message}
} 
export const hideLoader = () => {
    return{type:HIDELOADER}
}