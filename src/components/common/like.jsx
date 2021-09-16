import React from 'react'

const Like = ({ liked, onClick }) => {
  let iconClass = 'fa fa-heart'
  if (!liked) iconClass += '-o'
  return (
    <React.Fragment>
      <i
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className={iconClass}
        aria-hidden="true"></i>
    </React.Fragment>
  )
}

export default Like
