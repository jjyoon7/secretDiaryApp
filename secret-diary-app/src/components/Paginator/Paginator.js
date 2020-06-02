import React from 'react'

import './Paginator.css'

const paginator = ({currentPage, onPrevious, onNext, lastPage}) => (
  <div className="paginator">
    {/* {props.children} */}
    <div className="paginator__controls">
      {currentPage > 1 && (
        <button className="paginator__control" onClick={onPrevious}>
          Previous
        </button>
      )}
      {currentPage < lastPage && (
        <button className="paginator__control" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  </div>
)

export default paginator
