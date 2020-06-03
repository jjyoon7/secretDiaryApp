import React from 'react'
import { createPortal }from 'react-dom'
import usePortal from '../../hooks/usePortal'

import Button from '../Button/Button'
import './Modal.css'

const Modal = ({ id, children }) => {
  const target = usePortal(id)

  return createPortal(
    children,
    target
  )
}

export default Modal
