import React from "react";

const Notification = ({ message, type }) => (
  <div className={"notification " + type}>
    <p>{message}</p>
  </div>
)

export default Notification
