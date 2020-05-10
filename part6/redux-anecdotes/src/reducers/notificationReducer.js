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

let timeoutID

export const setNotification = (message, duration = 5) => {
  return async (dispatch) => {
    dispatch({
      type: types.set,
      data: message
    })

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: types.unset
  }
}

export default reducer
