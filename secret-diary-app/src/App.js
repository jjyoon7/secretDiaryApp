import React, { useState, useEffect, Fragment} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// import Layout from './components/Layout/Layout'
// import Backdrop from './components/Backdrop/Backdrop'
// import Toolbar from './components/Toolbar/Toolbar'
// import MainNavigation from './components/Navigation/MainNavigation/MainNavigation'
// import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation'
// import ErrorHandler from './components/ErrorHandler/ErrorHandler'
// import FeedPage from './pages/Feed/Feed'
// import SinglePostPage from './pages/Feed/SinglePost/SinglePost'
// import LoginPage from './pages/Auth/Login'
// import SignupPage from './pages/Auth/Signup'

export default function App() {
  const [ showBackdrop, setShowBackDrop ] = useState(false)
  const [ showMobileNav, setShowMobileNav ] = useState(false)
  const [ isAuth, setIsAuth ] = useState(true)
  const [ token, setToken ] = useState(null)
  const [ userId, setUserId ] = useState(null)
  const [ authLoading, setAuthLoading ] = useState(false)
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

  mobileNavHandler = isOpen => {
    setShowMobileNav(isOpen)
    setShowBackDrop(isOpen)
  }

  backdropClickHandler = () => {
    setShowMobileNav(false)
    setShowBackDrop(false)
    setError(null)
  }

  logoutHandler = () => {
    setIsAuth(false)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    localStorage.removeItem('userId')
  }

  loginHandler = (event, authData) => {
    event.preventDefault()
    setAuthLoading(true)

    fetch('URL')
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.')
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!')
          throw new Error('Could not authenticate you!')
        }
        return res.json()
      })
      .then(resData => {
        console.log(resData)
        setIsAuth(true)
        setToken(resData.token)
        setAuthLoading(false)
        setUserId(resData.userId)

        localStorage.setItem('token', resData.token)
        localStorage.setItem('userId', resData.userId)
        const remainingMilliseconds = 60 * 60 * 1000
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        )
        localStorage.setItem('expiryDate', expiryDate.toISOString())
        setAutoLogout(remainingMilliseconds)
      })
      .catch(err => {
        console.log(err)
        setIsAuth(false)
        setAuthLoading(false)
        setError(err)
      })
  }

  signupHandler = (event, authData) => {
    event.preventDefault()
    setAuthLoading(true)

    fetch('URL')
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          )
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!')
          throw new Error('Creating a user failed!')
        }
        return res.json()
      })
      .then(resData => {
        console.log(resData)
        setIsAuth(false)
        setAuthLoading(false)

        //find a way to not use this.props
        this.props.history.replace('/')
      })
      .catch(err => {
        console.log(err)
        setIsAuth(false)
        setAuthLoading(false)
        setError(err)
      })
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler()
    }, milliseconds)
  }

  errorHandler = () => {
    setError(null)
  }

  return (
    <Fragment>
        {isAuth ? 
          <Switch>
            <Route path="/" exact>
                <FeedPage userId={userId} token={token} />
            </Route>

            <Route path="/:postId">
              <SinglePostPage {...props} userId={userId} token={token}/>
            </Route>

            <Redirect to="/" />
          </Switch> : 
          
          <Switch>
            <Route path="/" exact>
              <LoginPage {...props} onLogin={loginHandler} loading={state.authLoading} />
            </Route>

            <Route path="/signup" exact>
              <SignupPage {...props} onSignup={signupHandler} loading={authLoading}/>
            </Route>
            
            <Redirect to="/" />
          </Switch>
          }
    </Fragment>
  )
}
