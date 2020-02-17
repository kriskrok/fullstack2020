const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const response = await Blog.insertMany(helper.initialBlogs)
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


  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain('The Winnie the Pooh Guide to Blogging')
    })

    test('without likes gets assigned 0 likes', async () => {
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

      let postedBlog = blogsAtEnd.find(blog =>
        blog.title === 'The Winnie the Pooh Guide to Blogging' &&
        blog.author === 'James Chartrand' &&
        blog.url === 'https://copyblogger.com/winnie-the-pooh-blogging/'
      )

      expect(postedBlog).toHaveProperty('likes')
      expect(postedBlog.likes).toBe(0)
    })

    test('fails with status code 400 if title is missing', async () => {
      const newBlog = {
        author: 'James Chartrand',
        url: 'https://copyblogger.com/winnie-the-pooh-blogging/'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const newBlog = {
        title: 'The Winnie the Pooh Guide to Blogging',
        author: 'James Chartrand'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const contents = blogsAtEnd.map(r => r.url)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
      expect(contents).not.toContain(blogToDelete.url)
    })
  })

  describe('update of a blog', () => {
    test('succeeds with a status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogAtStart = blogsAtStart[1]
      const blogToUpdate = {
        ...blogAtStart,
        likes: 12345
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const updatedBlog = response.body

      expect(updatedBlog.likes).not.toBe(blogAtStart.likes)
      expect(updatedBlog.likes).toBe(12345)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})