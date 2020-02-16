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

  console.log(blog)

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

afterAll (() => {
  mongoose.connection.close()
})