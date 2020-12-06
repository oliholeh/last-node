const Post = require('./models/post')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,)))
app.use(
  'public/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
)

app.get('/', (req, res) => {
  Post.find({}, (error, posts) => {
    console.log(posts)
    res.render('index', { title: 'oleh title', posts })
  })
})

app.get('/create', (req, res) => {
  res.render('create', { title: 'oleh title' })
})

app.post('/create', (req, res) => {
  const { title, body } = req.body
  Post.create({
    title,
    body,
  }).then((post) => console.log(post))
  res.redirect('/')
})

module.exports = app
