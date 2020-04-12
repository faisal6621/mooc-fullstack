import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const submitHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm addBlog={submitHandler} />
    )
  })

  test('should submit form with correct inputs', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'React Unit Test' }
    })
    fireEvent.change(author, {
      target: { value: 'Jest' }
    })
    fireEvent.change(url, {
      target: { value: 'localhost' }
    })

    const submitButton = component.getByText('create')
    fireEvent.click(submitButton)

    expect(submitHandler.mock.calls).toHaveLength(1)
    expect(submitHandler.mock.calls[0][0].title).toBe('React Unit Test')
    expect(submitHandler.mock.calls[0][0].author).toBe('Jest')
    expect(submitHandler.mock.calls[0][0].url).toBe('localhost')
  })

})
