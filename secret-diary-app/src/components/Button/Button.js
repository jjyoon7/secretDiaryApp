import React from 'react'
import { Link } from 'react-router-dom'

import './Button.css'

const button = props =>
  !link ? (
    <button
      className={[
        'button',
        `button--${design}`,
        `button--${mode}`
      ].join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? 'Loading...' : props.children}
    </button>
  ) : (
    <Link
      className={[
        'button',
        `button--${design}`,
        `button--${mode}`
      ].join(' ')}
      to={link}
    >
      {props.children}
    </Link>
  )

export default button
