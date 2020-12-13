const types = {
    set: 'set_blog',
    add: 'add_blog',
    update: 'update_blog',
    delete: 'delete_blog',
}

const defaultState = []

const defaultAction = {
    type: ''
}

const reducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case types.set:
            return action.data
        case types.add:
            return state.concat(action.data)
        case types.update:
            return state.filter(blog => blog.id !== action.data.id).concat(action.data)
        case types.delete:
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
    }
}

export const setBlogs = (blogs) => {
    return {
        type: types.set,
        data: blogs
    }
}

export const addBlog = (blog) => {
    return {
        type: types.add,
        data: blog
    }
}

export const updateBlog = (blog) => {
    return {
        type: types.update,
        data: blog
    }
}

export const deleteBlog = (blog) => {
    return {
        type: types.delete,
        data: blog
    }
}

export default reducer
