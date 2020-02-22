import React, {useState} from 'react'

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
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">
          title:
          <input type="text" value={newBlog.title} name="title"
          onChange={({ target }) => (setNewBlog({ ...newBlog, title: target.value }))} />
        </label>
      </div>
      <div>
        <label htmlFor="author">
          author:
          <input type="text" value={newBlog.author} name="author"
          onChange={({ target }) => (setNewBlog({ ...newBlog, author: target.value }))} />
        </label>
      </div>
      <div>
        <label htmlFor="url">
          url:
          <input type="text" value={newBlog.url} name="url" spellCheck="false"
          onChange={({ target }) => (setNewBlog({ ...newBlog, url: target.value }))} />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
    </>
  )
}

export default SubmitForm