import * as axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000' });

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = ` Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }
//      return req;
// })

export const signIn = (formData) => API.post('/signIn', formData);
export const signUp = (formData) =>  API.post('/signUp', formData);
export const getUser = (userEmail) => API.post('/getUser', userEmail);
export const updateUser = (formData) => API.patch('/updateUser', formData);

export const getDoctors = () => API.get('/getDoctors');
export const requestSession = (data) => API.patch('/requestSession', data);

export const acceptSession = (data) => API.patch('/acceptSession', data);
export const deleteRequest = (data) => API.patch('/deleteRequest', data);

export const sessionFailed = (data) => API.patch('/sessionFailed', data);
export const sessionSucceed = (data) => API.patch('/sessionSucceed', data);
