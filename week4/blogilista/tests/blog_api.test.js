const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Canonical string reduction')
})

test('blogs have an ID', async () => {
  const response = await api.get('/api/blogs')
  let blog = response.body[0]

  expect(blog).toHaveProperty('id')
  expect(blog._id).toBeUndefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'The Winnie the Pooh Guide to Blogging',
    author: 'James Chartrand',
    url: 'https://copyblogger.com/winnie-the-pooh-blogging/',
    likes: 9001
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('The Winnie the Pooh Guide to Blogging')
})

test('blog without likes gets assigned 0 likes', async () => {
  const newBlog = {
    title: 'The Winnie the Pooh Guide to Blogging',
    author: 'James Chartrand',
    url: 'https://copyblogger.com/winnie-the-pooh-blogging/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  let postedBlog = blogsAtEnd.filter(blog => 
    blog.title === 'The Winnie the Pooh Guide to Blogging' &&
    blog.author === 'James Chartrand' &&
    blog.url === 'https://copyblogger.com/winnie-the-pooh-blogging/'
  )

  expect(...postedBlog).toHaveProperty('likes')
  expect(postedBlog[0].likes).toBe(0)
})

afterAll (() => {
  mongoose.connection.close()
})