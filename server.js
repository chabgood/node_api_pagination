const express = require('express')
const app = express()

const mongoose = require('mongoose')
const User = require('./users')
mongoose.connect('mongodb://localhost/pagination', { useUnifiedTopology: true, useNewUrlParser: true } )
const db = mongoose.connection

db.once('open', async () => {
  if(await User.countDocuments().exec() > 0) return

  Promise.all([
    User.create({ name: 'moo1'}),
    User.create({ name: 'moo2'}),
    User.create({ name: 'moo3'}),
    User.create({ name: 'moo4'}),
    User.create({ name: 'moo5'}),
    User.create({ name: 'moo6'}),
    User.create({ name: 'moo7'}),
    User.create({ name: 'moo8'}),
    User.create({ name: 'moo9'}),
    User.create({ name: 'moo10'}),
    
  ]).then(() => console.log('added users'))
})

app.get('/users', paginatedResults(User), (req, res) => {
  
  res.json(res.paginatedResults)
})

function paginatedResults(model) {
  return async (req, res, next) => {
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
    results.results = await model.find().limit(limit).skip(startIndex).exec()
    res.paginatedResults = results
    next()
    }
  }

app.listen(3000)