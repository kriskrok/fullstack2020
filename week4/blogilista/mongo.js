const config = require('./utils/config')
const mongoose = require('mongoose')

if (process.argv.length != 2 && process.argv.length != 6) {
  console.error('Kindly provide title, author, url and likes as an command-line arguments')
  process.exit(1)
}

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

const blogSchema = mongoose.Schema({
  title: String,  // process.argv[2]
  author: String, // process.argv[3]
  url: String,    // process.argv[4]
  likes: Number   // process.argv[5]
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length === 2) {
  console.log('hei mom')
  Blog.find({}).then(result => {

    console.log('bloglist:')
    result.forEach(blog => {
      console.log(result)
    })
    mongoose.connection.close()
    process.exit(0)
  })
} else {
  const blog = new Blog({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes: Number(process.argv[5])
  })

  blog.save().then(respone => {
    console.log('Response: ' , respone)
    mongoose.connection.close()
    process.exit(0)
  })
}
