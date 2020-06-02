import React, { useState } from 'react'

import Input from '../../components/Form/Input/Input'
import Button from '../../components/Button/Button'
import { required, length, email } from '../../util/validators'
import Auth from './Auth'

export default function Signup({loading}) {
  const signupForm = {
    signupForm: {
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
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },
      formIsValid: false
    }
  }

  const [ signupFormObj, setSignupFormObj ] = useState(signupForm)

  const inputChangeHandler = (input, value) => {
      let isValid = true
      for (const validator of signupFormObj.signupForm[input].validators) {
        isValid = isValid && validator(value)
      }
      const updatedForm = {
        ...signupFormObj.signupForm,
        [input]: {
          ...signupFormObj.signupForm[input],
          valid: isValid,
          value: value
        }
      }
      let formIsValid = true
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid
      }
  }

  const inputBlurHandler = input => {
    return {
      signupForm: {
        ...signupFormObj.signupForm,
        [input]: {
          ...signupFormObj.signupForm[input],
          touched: true
        }
      }
    }
  }

  const onSignup = (e) => {
    return signupForm
  }

  return (
    <Auth>
      <form onSubmit={onSignup}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'email')}
          value={signupForm['email'].value}
          valid={signupForm['email'].valid}
          touched={signupForm['email'].touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'name')}
          value={signupForm['name'].value}
          valid={signupForm['name'].valid}
          touched={signupForm['name'].touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler.bind(this, 'password')}
          value={signupForm['password'].value}
          valid={signupForm['password'].valid}
          touched={signupForm['password'].touched}
        />
        <Button design="raised" type="submit" loading={loading}>
          Signup
        </Button>
      </form>
    </Auth>
  )
}

