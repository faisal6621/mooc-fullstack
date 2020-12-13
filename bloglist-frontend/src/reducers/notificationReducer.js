const types = {
    set: 'set_notification',
    unset: 'unset_notification'
}

const defaultState = {
    message: '',
    type: ''
}

const defaultAction = {
    type: ''
}

const reducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case types.set:
            return action.data
        case types.unset:
            return defaultState
        default:
            return state
    }
}

export const setNotification = (message, type) => {
    return {
        type: types.set,
        data: { message, type },
    }
}

export const clearNotification = () => {
    return {
        type: types.unset
    }
}

export default reducer
