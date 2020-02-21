const express = require('express')
const app = express()

const users = [
  {id: 1, name: 'moo'},
  {id: 2, name: 'moo2'},
  {id: 3, name: 'moo3'},
  {id: 4, name: 'moo4'},
  {id: 5, name: 'moo5'},
  {id: 6, name: 'moo6'},
  {id: 7, name: 'moo7'},
  {id: 8, name: 'moo8'},
  {id: 9, name: 'moo9'},
  {id: 10, name: 'moo10'},
  {id: 11, name: 'moo11'},
  
] 

const posts = [

]

app.get('/posts' , paginatedResults(posts), (req, res) => {
  res.json(postsres.paginatedResults)
})

app.get('/users', paginatedResults(users), (req, res) => {
  
  res.json(res.paginatedResults)
})

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    results.results = model.slice(startIndex, endIndex)
    res.paginatedResults = results
    next()
    }
  }

app.listen(3000)