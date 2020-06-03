import React, { useState, useEffect, Fragment} from 'react'

import Layout from './components/Layout/Layout'
import Backdrop from './components/Backdrop/Backdrop'
import Toolbar from './components/Toolbar/Toolbar'
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation'
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation'
import ErrorHandler from './components/ErrorHandler/ErrorHandler'
import AuthorizedUserFeed from './pages/Feed/AuthorizedUserFeed'
import UnAuthorizedUserFeed from './pages/Feed/UnAuthorizedUserFeed'

export default function App() {
  const [ showBackdrop, setShowBackDrop ] = useState(false)
  const [ showMobileNav, setShowMobileNav ] = useState(false)
  const [ isAuth, setIsAuth ] = useState(true)
  const [ token, setToken ] = useState(null)
  const [ userId, setUserId ] = useState(null)
  const [ error, setError ] = useState(null)

 
  useEffect(() => {
    const token = localStorage.getItem('token')
    const expiryDate = localStorage.getItem('expiryDate')

    if (!token || !expiryDate) {
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler()
      return
    }
    const userId = localStorage.getItem('userId')
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime()
    setIsAuth(true)
    setToken(token)
    setUserId(userId)
    setAutoLogout(remainingMilliseconds)
  }, [])

  const mobileNavHandler = isOpen => {
    setShowMobileNav(isOpen)
    setShowBackDrop(isOpen)
  }

  const backdropClickHandler = () => {
    setShowMobileNav(false)
    setShowBackDrop(false)
    setError(null)
  }

  const logoutHandler = () => {
    setIsAuth(false)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')
  }

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler()
    }, milliseconds)
  }

  const errorHandler = () => {
    setError(null)
  }

  return (
    <Fragment>
        {isAuth ? <AuthorizedUserFeed  /> : <UnAuthorizedUserFeed setIsAuth={setIsAuth}
                                                                  setToken={setToken}
                                                                  setUserId={setUserId}
                                                                  setAutoLogout={setAutoLogout}
                                                                  setError={setError}                                     
        />}
    </Fragment>
  )
}
