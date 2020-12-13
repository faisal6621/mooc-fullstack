import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  return (
    <div className={'notification ' + notification.type}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification
