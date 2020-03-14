import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SubmitForm from './SubmitForm'

test('<SubmitForm /> calls createBlog with correct form inputs with onSubmit', () => {
  const addNewBlog = jest.fn()

  const component = render(
    <SubmitForm createBlog={addNewBlog} />
  )

  const form = component.container.querySelector('form')
  const titleInput = component.container.querySelector('[name=title]')
  const authorInput = component.container.querySelector('[name=author]')
  const urlInput = component.container.querySelector('[name=url]')

  fireEvent.change(titleInput, {
    target: { value: 'Canonical string reduction' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Edsger W. Dijkstra' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' }
  })

  fireEvent.submit(form)

  expect(form).toHaveFormValues({
    title: '',
    author: '',
    url: '',
  })

  const testi = {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  }

  expect(addNewBlog.mock.calls[0][0]).toMatchObject(testi)
  expect(addNewBlog.mock.calls).toHaveLength(1)
})
