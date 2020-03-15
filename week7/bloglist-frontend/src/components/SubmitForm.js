import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SubmitForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })

    setNewBlog({ ...newBlog, title: '', author: '', url: '' })
  }

  return (
    <>
      <form style={{ margin: 'auto', maxWidth: '50%'}} onSubmit={addBlog} className='submit-form'>
        <h2>create new</h2>
        <div className='form-group row'>
          <label htmlFor='username' className='col-sm-3 col-form-label'>
            title:
          </label>
          <div className='col-sm-9'>
            <input type='text' className='form-control' value={newBlog.title} id='title' required
              onChange={({ target }) => (setNewBlog({ ...newBlog, title: target.value }))} />
          </div>
        </div>

        <div className='form-group row'>
          <label htmlFor='author' className='col-sm-3 col-form-label'>
            author:
          </label>
          <div className='col-sm-9'>
            <input type='text' className='form-control' value={newBlog.author} id='author' required
              onChange={({ target }) => (setNewBlog({ ...newBlog, author: target.value }))} />
          </div>
        </div>

        <div className='form-group row'>
          <label htmlFor='url' className='col-sm-3 col-form-label'>
            url:
          </label>
          <div className='col-sm-9'>
            <input type='text' className='form-control' value={newBlog.url} id='url' required
              onChange={({ target }) => (setNewBlog({ ...newBlog, url: target.value }))} />
          </div>
        </div>
        <button type='submit' className='btn btn-dark'>create</button>
      </form>
    </>
  )
}

SubmitForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default SubmitForm