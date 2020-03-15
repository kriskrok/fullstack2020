const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const response = await Blog.insertMany(helper.initialBlogs)

    await User.deleteMany({})
    await api
      .post('/api/users')
      .send({ username: 'root', name: 'Remontti Reiska', password: 'sekret' })
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

    test('fails without a valid token', async () => {
      const newBlog = {
        title: 'The Winnie the Pooh Guide to Blogging',
        author: 'James Chartrand',
        url: 'https://copyblogger.com/winnie-the-pooh-blogging/',
        likes: 9001
      }
  
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toContain('invalid token')

    })

    test('succeeds with valid token and data', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
  
      const token = 'bearer '.concat(res.body.token)
  
      const newBlog = {
        title: 'The Winnie the Pooh Guide to Blogging',
        author: 'James Chartrand',
        url: 'https://copyblogger.com/winnie-the-pooh-blogging/',
        likes: 9001
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain('The Winnie the Pooh Guide to Blogging')
    })


    test('without likes gets assigned 0 likes', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
  
      const token = 'bearer '.concat(res.body.token)

      const newBlog = {
        title: 'The Winnie the Pooh Guide to Blogging',
        author: 'James Chartrand',
        url: 'https://copyblogger.com/winnie-the-pooh-blogging/'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
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
      const res = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
  
      const token = 'bearer '.concat(res.body.token)

      const newBlog = {
        author: 'James Chartrand',
        url: 'https://copyblogger.com/winnie-the-pooh-blogging/'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is missing', async () => {
      const res = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
  
      const token = 'bearer '.concat(res.body.token)

      const newBlog = {
        title: 'The Winnie the Pooh Guide to Blogging',
        author: 'James Chartrand'
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
  
      const token = 'bearer '.concat(response.body.token)
  
      const newBlog = {
        title: 'The Winnie the Pooh Guide to Blogging',
        author: 'James Chartrand',
        url: 'https://copyblogger.com/winnie-the-pooh-blogging/',
        likes: 9001
      }
  
      const postedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  

      await api
        .delete(`/api/blogs/${postedBlog.body.id}`)
        .set('Authorization', token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const contents = blogsAtEnd.map(r => r.url)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      expect(contents).not.toContain(newBlog.url)
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

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({
        username: 'root',
        name: 'Remontti Reiska',
        password: 'sekret'
      })
      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mehi',
        name: 'Maija Mehiläinen',
        password: 'salasana',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is shorter than 3 characters', async () => {      
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'rö',
        name: 'Röllimetsän Rölli',
        password: 'likaiset_varpaat',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(`\`username\` (\`${newUser.username}\`) is shorter than the minimum`)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is missing', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Vappu Satanen',
        password: 'harmaa_talous',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` is required.')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is shorter than 3 characters', async () => {      
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'Rölli',
        name: 'Röllimetsän Rölli',
        password: 'lv',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('invalid password, password has to be atleast 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is missing', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'vstanen',
        name: 'Vappu Satanen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('missing password field, thou shall provide a password')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})
