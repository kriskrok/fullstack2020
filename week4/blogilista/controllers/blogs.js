const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  if (!!body.title && !!body.url) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : Number(body.likes)
    })

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog.toJSON())
  /*   blog.save()
      .then(savedBlog => {
        res.status(201).json(savedBlog.toJSON())
      })
      .catch(error => next(error))*/
  } else {
    res.status(400).end()
  } 
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter
