import * as axios from 'axios'

const API = axios.create({ baseURL: 'https://mollify-webapp.herokuapp.com' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userToken')) {
    req.headers.Authorization = ` Bearer ${localStorage.getItem('userToken')}`
  }
  return req
})

//user requests
export const signIn = (formData) => API.post('/api/auth/signIn', formData)
export const signUp = (formData) => API.post('/api/auth/signUp', formData)
export const getUser = () => API.get('/api/auth/getUser')
export const updateUser = (formData) =>
  API.patch('/api/auth/updateUser', formData)
export const deleteUser = () => API.delete(`/api/auth/deleteUser`)

//for chat panel
export const getOtherUser = (userId) =>
  API.get(`/api/auth/getOtherUser/${userId}`)

//patient requests
export const getDoctors = () => API.get('/api/patient/getDoctors')
export const requestSession = (data) =>
  API.patch('/api/patient/requestSession', data)
export const sessionCompleted = (data) =>
  API.patch('/api/patient/sessionCompleted', data)

//doctor requests
export const acceptSession = (data) =>
  API.patch('/api/doctor/acceptSession', data)
export const sessionFailed = (data) =>
  API.patch('/api/doctor/sessionFailed', data)
export const sessionSucceed = (data) =>
  API.patch('/api/doctor/sessionSucceed', data)

//common routes
export const deleteRequest = (data) => API.patch('/api/deleteRequest', data)

//Conversation Requests
export const getUserConversation = () =>
  API.get('/api/conversation/getConversations')
export const getMessages = (id) => API.get(`/api/message/${id}`)
export const sendMessage = (data) => API.post('/api/message', data)
