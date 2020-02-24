import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('to be named', () => {
  const blog = {
    'title': 'The Winnie the Pooh Guide to Bloggin',
    'author': 'James Charthand',
    'url': 'https://copyblogger.com/winnie-the-pooh-blogging',
    'likes': 9001
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component).toBeDefined()

  const hideButton = component.container.querySelector('.hide-blog-button')
  const expandButton = component.container.querySelector('.expand-blog-button')
  const element = component.getByText('James Charthand')

  expect(component.container).not.toContainElement(hideButton)
  expect(component.container).toContainElement(expandButton)
  expect(element).toBeDefined()

  expect(component.container).not.toHaveTextContent(
    'copyblogger.com/winnie-the-pooh-blogging'
  )

  expect(component.container).not.toHaveTextContent(
    'likes 9001'
  )

  expect(component.container).toHaveTextContent(
    'The Winnie the Pooh Guide to Bloggin'
  )
})
