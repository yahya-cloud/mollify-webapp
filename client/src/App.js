import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'
import decode from 'jwt-decode'
import { getUser, logOut } from './store/actions/auth'
import socket, { ContextProvider } from './socket/socket'

import Register from './Pages/Register/Register'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import RoutingContainer from './components/RoutingContainer/RoutingContainer'
import Modal from './components/UI/Modal/Modal'
import Notification from './components/Notification/Notification'

const App = () => {
  const { user } = useSelector((state) => state)
  const token = localStorage.getItem('userToken')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (user) {
      socket.emit('addUser', user._id)
    }
  }, [user])

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logOut(history))
      } else {
        dispatch(getUser())
      }
    }
  }, [dispatch, token, history])

  return (
    <ContextProvider>
      <div className='appContainer'>
        <Modal />
        <Notification />
        {!user ? (
          <Route path='/'>
            <Register />
          </Route>
        ) : (
          <div className='mainContainer'>
            <Header />
            <Navbar />
            {/* to show doctor or patient pages */}
            <RoutingContainer userType={user.userType} />
          </div>
        )}
      </div>
    </ContextProvider>
  )
}

export default React.memo(App)
