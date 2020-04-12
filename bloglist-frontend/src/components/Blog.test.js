import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
// import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Default Blog',
      likes: 0,
      author: 'Jest',
      url: 'localhost'
    }
    const like = jest.fn()
    const deleteBlog = jest.fn()

    component = render(
      <Blog blog={blog} like={like} canDeleteBlog={false} deleteBlog={deleteBlog} />
    )
  })

  test('should display only title by default', () => {
    expect(component.container).toHaveTextContent('Default Blog')

    const blogContent = component.container.querySelector('.blogContent')
    expect(blogContent).toHaveStyle('display: none')
  })

  test('should display blog content on click', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const blogContent = component.container.querySelector('.blogContent')
    expect(blogContent).not.toHaveStyle('display: none')
  })

})
