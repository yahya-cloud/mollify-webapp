import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'
import decode from 'jwt-decode'
import { getUser, logOut } from './store/actions/auth'

import Register from './Pages/Register/Register'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import RoutingContainer from './components/RoutingContainer/RoutingContainer'
import Modal from './components/UI/Modal/Modal'

const App = () => {
  const { user } = useSelector((state) => state)
  const token = localStorage.getItem('userToken')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logOut(history))
      } else {
        dispatch(getUser(decodedToken.email))
      }
    }
  }, [dispatch, token, history])

  return (
    <div className='appContainer'>
      <Modal />
      {!user ? (
        <Route path='/'>
          <Register />
        </Route>
      ) : (
        <div className='mainContainer'>
          <Header />
          <Navbar />
          {/* to show doctor or patient pages */}
          <RoutingContainer />
        </div>
      )}
    </div>
  )
}

export default React.memo(App)
