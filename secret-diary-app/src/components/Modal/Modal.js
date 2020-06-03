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

// const modal = props =>
//   ReactDOM.createPortal(
//     <div className="modal">
//       <header className="modal__header">
//         <h1>{props.title}</h1>
//       </header>
//       <div className="modal__content">{props.children}</div>
//       <div className="modal__actions">
//         <Button design="danger" mode="flat" onClick={props.onCancelModal}>
//           Cancel
//         </Button>
//         <Button
//           mode="raised"
//           onClick={props.onAcceptModal}
//           disabled={!props.acceptEnabled}
//           loading={props.isLoading}
//         >
//           Accept
//         </Button>
//       </div>
//     </div>,
//     document.getElementById('modal-root')
//   );

export default Modal
