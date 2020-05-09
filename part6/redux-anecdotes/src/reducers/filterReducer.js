const types = {
  set: 'set_filter'
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case types.set:
      return action.data
    default:
      return state
  }
}

export const setFilter = (text) => {
  return {
    type: types.set,
    data: text
  }
}

export default reducer
