import React from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../../hooks/usePortal'

import './Backdrop.css'

const Backdrop = ({ id, children, open, onClick }) => {
  const target = usePortal(id)

  return createPortal(
    children,
    target,
    <div
    className={['backdrop', open ? 'open' : ''].join(' ')}
    onClick={onClick}
  />
  )
}

export default Backdrop
