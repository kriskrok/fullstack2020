const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes)
  })

  blog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
