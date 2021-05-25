import {combineReducers} from 'redux';


import user from './auth';
import modal from './modal';

export default combineReducers({user, modal});