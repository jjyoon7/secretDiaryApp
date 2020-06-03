import React, { useState } from 'react'

import Input from '../../components/Form/Input/Input'
import Button from '../../components/Button/Button'
import { required, length, email } from '../../util/validators'
import Auth from './Auth'

export default function Login({loading}) {
  const loginForm = {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
      },
      formIsValid: false
  }
  
  const [ loginFormObj, setLoginFormObj ] = useState(loginForm)

  const inputChangeHandler = (input, value) => {
      let isValid = true
      for (const validator of loginFormObj[input].validators) {
        isValid = isValid && validator(value)
      }
      const updatedForm = {
        ...loginFormObj,
        [input]: {
          ...loginFormObj[input],
          valid: isValid,
          value: value
        }
      }
      let formIsValid = true
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid
      }
  }

  const inputBlurHandler = input => {
      return {
        loginForm: {
          ...loginFormObj,
          [input]: {
            ...loginFormObj[input],
            touched: true
          }
        }
      }
  }

  const onLogin = (e) => {
    return {
      email: loginFormObj.email.value,
      password: loginFormObj.password.value
    }
  }

  return (
    <Auth>
      <form
        onSubmit={onLogin}
      >
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'email')}
          value={loginFormObj['email'].value}
          valid={loginFormObj['email'].valid}
          touched={loginFormObj['email'].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'password')}
          value={loginFormObj['password'].value}
          valid={loginFormObj['password'].valid}
          touched={loginFormObj['password'].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Auth>
  )

}


