const Post = require('./models/post')
const app = require('express')()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
const data = ['Hello', 'world', 'test']

app.get('/', (req, res) => {
  res.render('index', { title: 'oleh title', data })
})

app.get('/create', (req, res) => {
  res.render('create', { title: 'oleh title', data })
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
