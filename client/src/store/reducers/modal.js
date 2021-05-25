import {SHOWLOADER, HIDELOADER} from '../actions/actionTypes';


const loader = (state = {show:false, msg:''},  action ) => {
    switch (action.type) {
        case SHOWLOADER:
            return {show: true, msg: action?.payload}

        case HIDELOADER:
            return {show: false, msg: ''}

        default:
            return state
    }
}


export default loader;