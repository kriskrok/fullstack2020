const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return !blogs
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let maxLikes = Math.max(...blogs.map(blog => blog.likes))
  
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogsInOrder = _.countBy(blogs, 'author')

  const sorted = _.chain(blogsInOrder)
    .map((blogs, author) => {
      return {
        author: author,
        blogs: blogs
      }
    }).value();

  return sorted[sorted.length -1]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const result = _.chain(blogs)
    .groupBy('author')
    .toPairs()
    .map(s => { return _.zipObject(['author', 'likes'], s) })
    .map(s => {
      s.likes = _.map(s.likes, x => x.likes);
      return s;
    })
    .value()

  const mostLikedAuthor = result.reduce((acc, curr) => {
    let likes = _.sum(curr.likes)
    if (likes > acc.likes) {
      return { author: curr.author, likes: likes }
    }
    return acc
  }, { author: result[0].author, likes: _.sum(result[0].likes) })

  return mostLikedAuthor
}

  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
