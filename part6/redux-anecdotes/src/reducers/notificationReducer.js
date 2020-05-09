const types = {
  set: 'set_notification', unset: 'del_notification'
}

const reducer = (state = "", action) => {
  switch (action.type) {
    case types.set:
      return action.data
    case types.unset:
      return ''
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: types.set,
    data: message
  }
}

export const clearNotification = () => {
  return {
    type: types.unset
  }
}

export default reducer
