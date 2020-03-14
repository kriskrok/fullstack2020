import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />' , () => {
  let component
  let blog = {
    'title': 'The Winnie the Pooh Guide to Bloggin',
    'author': 'James Charthand',
    'url': 'https://copyblogger.com/winnie-the-pooh-blogging',
    'likes': 9001,
    'user': {
      'username': 'Maija',
      'id': '5e4be0a737acfc138c0ad002',
      'name': 'Maija Mehiläinen',
    },
  }

  const likeBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={likeBlog}/>
    )
  })

  test('at start only blog title and author are displayed', () => {
    expect(component).toBeDefined()
    expect(component.displayAll).toBeFalsy()

    const hideButton = component.container.querySelector('.hide-blog-button')
    expect(component.container).not.toContainElement(hideButton)

    const expandButton = component.container.querySelector('.expand-blog-button')
    expect(component.container).toContainElement(expandButton)

    const element = component.getByText('James Charthand')
    expect(element).toBeDefined()

    expect(component.container).toHaveTextContent(
      'The Winnie the Pooh Guide to Bloggin'
    )
  })

  test('at start url and likes are not displayed', () => {
    expect(component.container).not.toHaveTextContent(
      'copyblogger.com/winnie-the-pooh-blogging'
    )
    expect(component.container).not.toHaveTextContent(
      'likes 9001'
    )
  })

  describe('after clicking view button', () => {
    beforeEach(() => {
      const expandButton = component.container.querySelector('.expand-blog-button')
      fireEvent.click(expandButton)
    })

    test('url and likes are displayed', () => {
      expect(component.container).toHaveTextContent(
        'https://copyblogger.com/winnie-the-pooh-blogging'
      )
      expect(component.container).toHaveTextContent(
        'likes 9001'
      )
    })

    test('pressing like-button twice invokes the eventHandler twice', () => {
      const likeButton = component.getByText('like')
      expect(likeButton).toBeDefined()

      fireEvent.click(likeButton)
      fireEvent.click(likeButton)

      expect(likeBlog.mock.calls.length).toBe(2)
    })
  })
})