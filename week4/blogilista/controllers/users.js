const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { likes: 0, user: 0 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    const message = !body.password
      ? 'missing password field, thou shall provide a password'
      : 'invalid password, password has to be atleast 3 characters long'

    return response.status(400).json({
      error: `${message}`
    }).end()
  }

  const saltRounds = 15
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  console.log('mansikkaraparperi', savedUser)

  response.json(savedUser)
})

module.exports = usersRouter
