import {AUTH, LOGOUT} from '../actions/actionTypes';


const authReducer = (state = {userData: false},  action ) => {
    switch (action.type) {
        case AUTH:
            return {userData: action?.payload}

        case LOGOUT:
            return { userData: false}
    
        default:
            return { userData: false}
            break;
    }
}


export default authReducer;