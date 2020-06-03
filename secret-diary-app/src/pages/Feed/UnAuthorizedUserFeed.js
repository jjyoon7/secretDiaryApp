import React, { useState } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

import Login from '../Auth/Login'
import Signup from '../Auth/Login'

const UnAuthorizedUserFeed = ({setIsAuth, setToken, setUserId, setAutoLogout, setError}) => {
    const [ authLoading, setAuthLoading ] = useState(false)
    let history = useHistory(null)

    const loginHandler = (event, authData) => {
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

    const signupHandler = (event, authData) => {
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
          // this.props.history.replace('/')
  
          history.replace('/')
        })
        .catch(err => {
          console.log(err)
          setIsAuth(false)
          setAuthLoading(false)
          setError(err)
        })
    }

    return (
        <Switch>
          <Route path="/" exact>
            <Login onLogin={loginHandler} loading={authLoading} />
          </Route>
          <Route path="/signup" exact>
            <Signup onSignup={signupHandler} loading={authLoading}/>
          </Route>

          <Redirect to="/" />
        </Switch>
    )
} 

export default UnAuthorizedUserFeed