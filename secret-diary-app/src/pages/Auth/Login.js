import React, { useState } from 'react'

import Input from '../../components/Form/Input/Input'
import Button from '../../components/Button/Button'
import { required, length, email } from '../../util/validators'
import Auth from './Auth'

export default function Login({loading}) {
  const loginForm = {
    loginForm: {
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
  }
  
  const [ loginFormObj, setLoginFormObj ] = useState(loginForm)

  const inputChangeHandler = (input, value) => {
      let isValid = true
      for (const validator of loginFormObj.loginForm[input].validators) {
        isValid = isValid && validator(value)
      }
      const updatedForm = {
        ...loginFormObj.loginForm,
        [input]: {
          ...loginFormObj.loginForm[input],
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
          ...loginFormObj.loginForm,
          [input]: {
            ...loginFormObj.loginForm[input],
            touched: true
          }
        }
      }
  }

  const onLogin = (e) => {
    return {
      email: loginForm.email.value,
      password: loginForm.password.value
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
          value={loginForm['email'].value}
          valid={loginForm['email'].valid}
          touched={loginForm['email'].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'password')}
          value={loginForm['password'].value}
          valid={loginForm['password'].valid}
          touched={loginForm['password'].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Auth>
  )

}


